# Metanalyze

A web application that crawls a website and extracts a bunch of meta data.

## Getting started

### Local Traefik Docker Setup

This project is based on my local traefik docker setup. For more information visit the [repository](https://github.com/marvinarlt/local-traefik-docker-setup).

### Check settings

Make sure all settings are correct:

- Docker network in `docker-compose.yml`
- Traefik hosts in `docker-compose.yml`
- Hosts in `C:\Windows\System32\drivers\etc\hosts`

### Build and start containers

Run the following command to build and start up all services:

```
docker-compose up --build
```