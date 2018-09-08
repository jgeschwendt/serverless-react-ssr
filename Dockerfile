FROM node:latest@sha256:499dc14186a1f363c366f39aba4cf4e0a153aabc9ee3b5b5802dc6b29e3cef36

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
