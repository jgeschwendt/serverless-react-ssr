FROM node:latest@sha256:6ed32a4ad681e683a8920f905b90a9ae0fca69ee1280dcfb1b2b929d799a8161

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
