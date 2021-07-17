FROM ubuntu as installed-dependencies

# install curl so we can can do other things
RUN apt update
RUN apt install curl -y
# install node so we can do other things
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

FROM installed-dependencies as built-image
COPY . /source
WORKDIR /source
RUN npm install
RUN npm run-script build


FROM built-image as run
WORKDIR /source
RUN chmod +x run.sh

ENTRYPOINT ["/bin/bash", "/source/run.sh"]
