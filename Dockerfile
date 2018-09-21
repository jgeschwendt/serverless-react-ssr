FROM node:latest@sha256:32d5d5435e5038028bd0c0871d256d5887b06c4315cb1a135bcf81e0735627c9

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
