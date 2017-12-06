# Marketplace app based on Ethereum
A simple marketplace app.

# How to build (locally)
0. Install Docker and Docker compose
1. Run `git clone https://www.bitbucket.org/bagaric/pyrito.git && cd pyrito/` 
1. Run the following command in the command line - `make build-local`
2. Open a web browser and access `http://localhost:8080` to access the web app

# How to remove the docker containers
- Run the following command in the command line: `make remove-local`

# Useful debugging commands
- `docker ps -a` - lists all existing docker containers on the system
- `docker exec -ti <CONTAINER_NAME> bash` - console of the container