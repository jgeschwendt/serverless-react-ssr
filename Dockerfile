FROM node:latest@sha256:6ef2422607bf8303dd6747cdf47c97f3687a21a58453a80c137d4deb31d55be8

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
