FROM node:latest@sha256:e02c9963a48fe3b7e134ebfaf8aca75fef7f4988234c8c48aa84ec9294d35942

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
