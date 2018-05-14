FROM node:latest@sha256:492f2a28fbc54cf96eb0eea3faa2486179c71b3154a6b3e6b89b6c36ef7f59eb

# install the latest version of yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH

# check versions
RUN yarn --version

# expose development ports
EXPOSE 3000:3000
EXPOSE 3001:3001
