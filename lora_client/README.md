# Integrations

Check contents of `./ENV/local.example.env`, copy it to `./ENV/local.env` and update the corresponding values.

## Run it locally

Create an environment and install dependencies as follows:

```commandline
sudo pip install virtualenv
virtualenv --python=python3.10 venv
source venv/bin/activate
pip install -r requirements.txt
```

## Run it with Docker
```commandline
make start
```