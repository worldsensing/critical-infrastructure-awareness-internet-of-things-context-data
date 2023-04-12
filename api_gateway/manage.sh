# $1 service name
# $2 container_url
# $3 route name
# $4 route path

# Delete existing service or route if exists
curl -i -X DELETE --url http://localhost:8001/services/$1/routes/$3
curl -i -X DELETE --url http://localhost:8001/services/$1

# Add new service or route
curl -i -X POST --url http://localhost:8001/services/ --data "name=$1" --data "url=$2"
curl -i -X POST --url http://localhost:8001/services/$1/routes --data "name=$3" --data "paths[]=$4"