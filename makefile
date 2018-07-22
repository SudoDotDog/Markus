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

build: clean
	tsc --p $(build)

host:
	mongod --dbpath $(dbPath)

clean:
ifeq ($(OS), Windows_NT)
	cmd //C del dist
else
	rm -rf dist
endif

install:
	npm install
	npm install --only=dev