#!/usr/bin/env bash

usage() {
  echo "usage: sh stop.sh
  The script will stop the docker containers
  "
}

while [ "$1" != "" ]; do
  case $1 in
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

# Run the project
docker compose stop