#!/bin/bash

docker-compose up -d --build
docker-compose exec batch npm run pm
docker-compose exec batch npm run importJson
docker-compose exec batch npm run removeDuplication
