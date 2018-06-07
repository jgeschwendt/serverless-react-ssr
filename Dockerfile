FROM node:latest@sha256:c00e4cb3acfb2a0c4997ddb0e809cba37f9f6cce43efa9a6e6f7f1a79e094ab5

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
