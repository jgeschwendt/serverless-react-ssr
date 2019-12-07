FROM node:latest@sha256:737b3a051de3db388aac1d4ef2e7cf6b96e6dcceb3e1f700c01e8c250d7d5500

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
