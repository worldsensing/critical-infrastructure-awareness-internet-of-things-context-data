# critical-infrastructure-awareness-internet-of-things-context-data

Main repository for an article submitted.

In each folder, there is a README.md with more details.

To run the server, execute the `start.sh` script.  
To run the: `context_aware_engine`, `lora_client`,
or `raspberry_pi_client`, each folder has to be run in a Python standalone instance.

## Requirements

The project is based in microservices architecture using Docker and Docker Compose V2.

In addition, `npm` is a requirement to execute the frontend. It has been tested under npm `v18.0.0` and `v19.7.0`.

## Access

Once run, frontend is available at `:8000` and APIs at `:8000/api`.

## Changing External URL

External URLs must be changed in the following files:

- `./backend/app/config.py`
- `./frontend/grafana/ENV/grafana.ini`
- `./frontend/website/src/config.js`

Keys to change can be found with the `EXTERNAL_URL` name.
