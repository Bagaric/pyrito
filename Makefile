# Commands for the prod server
fetch-master: 
	git pull origin master

build-prod:
	docker-compose build $(container)
	docker-compose up -d $(container)

remove-prod: 
	docker-compose stop $(container)
	docker-compose rm -f $(container)

rebuild-prod: remove-prod build-prod

rebuild-master: fetch-master remove-prod build-prod

# Commands for local development
build-local: 
	docker-compose -f dev.yml build $(container)
	docker-compose -f dev.yml up -d $(container)

remove-local: 
	docker-compose -f dev.yml stop $(container)
	docker-compose -f dev.yml rm -f $(container)

rebuild-local: remove-local build-local


# Truffle commands
truffle-redeploy:
	rm -rf build/
	truffle compile
	truffle migrate
	truffle deploy
