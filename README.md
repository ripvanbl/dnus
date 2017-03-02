# Brandon Lind [![Build Status](https://travis-ci.org/ripvanbl/dnus.svg?branch=tests)](https://travis-ci.org/ripvanbl/dnus)

> Yet another personal project

This repo was used to teach myself Docker.

## Url Shortener
This drop-dead-simple application comprises of three main components, all wrapped up in docker composed containers.

* api - Node based application which supports the api used to generate and return the shortened url information
* cache - Redis based database which simply keeps the key-value pairs around for fetching
* web - Nginx server used to serve the web page and to act as a reverse-proxy for the api

### How to run

1. Install Docker for Mac|Windows
2. Run `docker-compose build` at the root of the project
3. Now run `docker-compose up -d`
4. Open your Browser and navigate to `http://localhost`
5. To stop, run `docker-compose down`

### Tips
To have changes to the source code reflected immediately, open the `docker-compose.yml` file and uncomment the volumes. You'll also want to do an `npm install` in the `/api` directory. 

Copyright (c) 2017 Brandon Lind
