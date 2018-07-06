FROM node:latest@sha256:65aa96a65c7187a0253b5e2fef6a1e155bb89889bab0ee990bbbe3a3e990ce65

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
