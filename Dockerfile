FROM node:latest@sha256:2cda73dd26369c2ec69130ddda6f83ff4980fd6fc8e73b5e670a7670d4c86ba0

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
