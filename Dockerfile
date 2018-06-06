FROM node:latest@sha256:4287578448a0c0db97b52c6986a82bd5077045a5a221aceb2f73ada40ac90a30

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
