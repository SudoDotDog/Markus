build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

dbPath := F:/db/

tsc := node_modules/.bin/tsc

markus: dev service

service: 
	@node ./dist/script/service/markus.js

run:
	@node ./dist/script/service/markus.js

dev:
	@$(tsc) --p $(dev)

build: clean ubuild

ubuild:
	@$(tsc) --p $(build)

host:
	@mongod --dbpath $(dbPath)

help:
	@echo ""
	@echo " ┌────────────── Markus Makefile Helps ───────────────────────────────────────────────┐ "
	@echo " ┝━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┥ "
	@echo " │ Command      │                                                                     │ "
	@echo " ┝━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┥ "
	@echo " │ make         │ Run application                                                     │ "
	@echo " │ make service │ Run application without build                                       │ "
	@echo " │ make run     │ Run application without build                                       │ "
	@echo " │ make dev     │ Build application with development typescript settings              │ "
	@echo " │ make build   │ Clean up and build application with production typescript settings  │ "
	@echo " │ make ubuild  │ Build application with development typescript settings              │ "
	@echo " │ make host    │ Start mongodb service with default dbPath                           │ "
	@echo " │ make clean   │ Clean up                                                            │ "
	@echo " │ make install │ Install dependences                                                 │ "
	@echo " └──────────────┴─────────────────────────────────────────────────────────────────────┘ "
	@echo ""

clean:
ifeq ($(OS), Windows_NT)
else
	@rm -rf dist
endif

install:
	@echo "Install Dependences From NPM"
	@npm install
	@npm install --only=dev