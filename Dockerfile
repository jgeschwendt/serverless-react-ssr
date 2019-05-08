FROM node:latest@sha256:6349241f3578f8f6f16f5c2dcc86e51ad208a680b02f03af3a5be620cec570fc

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

RUN yarn global add apollo
RUN yarn global add serverless

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
