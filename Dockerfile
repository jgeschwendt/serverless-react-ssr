FROM node:latest@sha256:cf2e3cd5251273c53bd5497b1a912a9956fb775710df8e015c835719f2ce7e14

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
