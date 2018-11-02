FROM node:latest@sha256:e17a990b19f2b031aee8a6c1d2905bf2a98a9a3579a9f13cfebc4a35bac2bbc5

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
