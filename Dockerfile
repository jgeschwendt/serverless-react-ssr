FROM node:latest@sha256:e5a9975f38cd9fbd412f6fe608c8dfdb1a31606ae10a42be29fb92affd0eb556

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
