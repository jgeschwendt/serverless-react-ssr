'use strict'

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless
    this.options = options

    this.hooks = {
      'before:package:finalize': this.beforePackageFinalize.bind(this),
    }
  }

  beforePackageFinalize () {
    const Resources = this.serverless.service.provider.compiledCloudFormationTemplate.Resources

    // Add caching to ApiGatewayMethodProxyVarGet
    Object.keys(Resources).map(key => {
      if (key === 'ApiGatewayMethodProxyVarGet') {
        Resources[key].Properties = {
          ...Resources[key].Properties,
          Integration: {
            ...Resources[key].Properties.Integration,
            CacheKeyParameters: ['method.request.path.proxy'],
            CacheNamespace: 'ApiGatewayMethodProxyVarGetCacheNS',
            RequestParameters: {
              'integration.request.path.proxy': 'method.request.path.proxy'
            }
          },
          RequestParameters: {
            ...Resources[key].Properties.RequestParameters,
            'method.request.path.proxy': true
          }
        }
      }

      // Add S3 Proxy API Method to the API Gateway Deployment dependencies
      if (key.indexOf('ApiGatewayDeployment') > -1) {
        Resources[key].DependsOn = [
          ...Resources[key].DependsOn,
          'ApiGatewayMethodStaticProxyVarGet'
        ]
      }
    })
  }
}

module.exports = ServerlessPlugin
