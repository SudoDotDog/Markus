build := tsc --p typescript/tsconfig.build.json
dev := tsc --p typescript/tsconfig.dev.json

markus: service

service:
	$(dev)
	node ./dist/script/service.js

run:
	node ./dist/index.js

build: clean
	$(build)

host:
	mongod --dbpath F:\db\

clean:
ifeq ($(OS), Windows_NT)
	cmd //C del dist
else
	rm -rf dist
endif

install:
	npm install
	npm install --only=dev