init: down up api-install frontend-install

up:
	docker-compose up -d --build

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

api-install:
	docker-compose exec api npm install

api-restart:
	docker-compose restart api

frontend-install:
	docker-compose exec frontend npm install
