#!/usr/bin/env bash

usage() {
  echo "usage: bash start.sh [ --rebuild_api_gateway [yes/NO] --rebuild_docker [yes/NO] \
  --rebuild_frontend [yes/NO] --rebuild_backend_database [yes/NO] ]

  The script will start the docker containers and configure the Kong endpoints

  To rebuild all:
  bash start.sh --rebuild_api_gateway yes --rebuild_docker yes --rebuild_frontend yes \
  --rebuild_backend_database yes

  To rebuild all without modifying the API DB:
  bash start.sh --rebuild_api_gateway yes --rebuild_docker yes --rebuild_frontend yes
  "
}

rebuild_api_gateway="no"
rebuild_docker="no"
rebuild_frontend="no"
rebuild_backend_database="no"
while [ "$1" != "" ]; do
  case $1 in
  --rebuild_api_gateway)
    shift
    rebuild_api_gateway=$1
    ;;
  --rebuild_docker)
    shift
    rebuild_docker=$1
    ;;
  --rebuild_frontend)
    shift
    rebuild_frontend=$1
    ;;
  --rebuild_backend_database)
    shift
    rebuild_backend_database=$1
    ;;
  --help)
    usage
    exit
    ;;
  *)
    usage
    exit 1
    ;;
  esac
  shift
done

if [ ! "$BASH_VERSION" ]; then
  echo "Please do not use sh to run this script, execute it with bash" 1>&2
  exit 1
fi

if [ "$rebuild_backend_database" == "yes" ]; then
  echo "Backend Postgres - Delete database and initialize"
  cd ./backend/ || exit
  sh ./setup_db.sh
  cd ../
fi

if [ ! -d ./frontend/website/build ] || [ "$rebuild_frontend" == "yes" ]; then
  echo "Frontend - Build process started"
  cd ./frontend/website/nginx || exit
  sh ./deploy.sh
  cd ../../../
fi

if [ "$rebuild_docker" == "yes" ]; then
  echo "DEPLOY - Rebuilding and pulling docker images"
  docker compose build
  docker compose pull
fi

echo "DEPLOY - Starting services"
docker compose up -d
cd ./api_gateway || exit
sh ./wait_for_kong.sh

if [ "$rebuild_api_gateway" == "yes" ]; then
  echo "KONG - Configuring endpoints"
  sh ./configure_endpoints.sh
fi
