# Register Frontend
sh ./manage.sh "frontend" "http://frontend:80" \
  "frontend-route-a" "/"

# Register Grafana
sh ./manage.sh "grafana-frontend" "http://grafana:3000" \
  "grafana-frontend-route-a" "/grafana"

# Register Backend APIs
## Swagger Documentation
sh ./manage.sh "api-docs" "http://backend_api:80/docs" \
  "api-docs-route-a" "/api/docs"
## API
sh ./manage.sh "api" "http://backend_api:80/" \
  "api-core-route-a" "/api/"


# Examples
#curl -i -X POST --url http://localhost:8001/services/ --data 'name=example-service' --data 'url=http://mockbin.org'
#curl -i -X POST --url http://localhost:8001/services/example-service/routes --data 'name=route-name' --data 'paths[]=/foo&paths[]=/bar'

## Delete
#curl -X DELETE --url http://localhost:8001/services/{service name or id}
#curl -X DELETE --url http://localhost:8001/services/{service name or id}/routes/{route name or id}
