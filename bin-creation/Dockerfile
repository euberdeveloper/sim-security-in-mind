# BASE IMAGE
FROM ubuntu:focal AS base

# Argument used to understand the product name
ARG PRODUCT_NAME=nmap
# Argument used to understand the product version
ARG PRODUCT_VERSION
# Argument used to understand the product meta info
ARG PRODUCT_META_INFO
# Argument used as prefix
ARG PREFIX=/usr/local/${PRODUCT_NAME}

# Fix interaction error with tzdata
ENV DEBIAN_FRONTEND=noninteractive
# Setting product name as env
ENV PRODUCT_NAME=${PRODUCT_NAME}
# Setting product version as env
ENV PRODUCT_VERSION=${PRODUCT_VERSION}
# Setting product meta info as env
ENV PRODUCT_META_INFO=${PRODUCT_META_INFO}
# Setting target name as env
ENV TARGET_NAME=${PRODUCT_NAME}${PRODUCT_VERSION:+-}${PRODUCT_VERSION}${PRODUCT_META_INFO:+-}${PRODUCT_META_INFO}
# Setting prefix as installed target
ENV PREFIX=${PREFIX}

# Update deps and install software-properties-common
RUN apt-get update -y

# BUILD IMAGE
FROM base AS build

# Install build deps
RUN apt-get install -y wget git automake ca-certificates g++ libtool make pkg-config cmake \
    && apt-get install -y libz-dev libjpeg-dev

RUN wget https://nmap.org/dist/nmap-7.95.tar.bz2 \
    && tar -xvjf nmap-7.95.tar.bz2 \
    && rm nmap-7.95.tar.bz2 

WORKDIR /nmap-7.95

RUN ./configure --prefix ${PREFIX}
RUN make -j$(nproc)
RUN make install

# PROD BASE IMAGE
FROM base AS prod_base

# Copy executable from build stage
COPY --from=build ${PREFIX}/. ${PREFIX}/.

# PROD IMAGE
FROM prod_base AS prod

# Copy script with patchelf instructions
COPY ./scripts/lellopatch.sh ./lellopatch.sh

# Install patchelf & file and use them to make the binary work with any path
RUN apt install -y patchelf file \
    && ./lellopatch.sh ${PREFIX}

# Test
RUN ${PREFIX}/bin/nmap --help

# Create output folder
RUN mkdir -p /output

CMD mv /${PREFIX} /output/${TARGET_NAME}