#!/bin/bash

if [ -z "$NODE_ENV" ]; then
  export NODE_ENV=development
fi

cd /var/www/api/bin

pm2 start -x bootstraper.js --name="dnus_api" --no-daemon --watch
