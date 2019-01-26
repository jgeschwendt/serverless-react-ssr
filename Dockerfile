FROM node:latest@sha256:6b3559fb9067c0ed6ac5966b8cd5c850eb2c2f53f5a432c72897bea3a4c43942

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
