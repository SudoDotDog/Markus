build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

dbPath := F:/db/

markus: dev service

service: 
	node ./dist/script/service.js

run:
	node ./dist/script/service.js

dev:
	tsc --p $(dev)

build: clean ubuild

ubuild:
	tsc --p $(build)

host:
	mongod --dbpath $(dbPath)

help:
	echo "make: run application"

clean:
ifeq ($(OS), Windows_NT)
else
	rm -rf dist
endif

install:
	npm install
	npm install --only=dev