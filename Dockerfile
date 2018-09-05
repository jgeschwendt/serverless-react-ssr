FROM node:latest@sha256:34685d3e9c35987c5f3419ea32cadcf7bde401e0963161c1fb11a8baeb8b93b6

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
