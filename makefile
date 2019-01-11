# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json
script := typescript/tsconfig.script.json

dbPath := F:/db/

# NPX functions
tsc := node_modules/.bin/tsc
mocha := node_modules/.bin/mocha

markus: dev run

help:
	@echo ""
	@echo " ┌─────────────── Markus Makefile Helps ───────────────────────────────────────────────┐ "
	@echo " ┝━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┥ "
	@echo " │ Command       │                                                                     │ "
	@echo " ┝━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┥ "
	@echo " │ make          │ Run application                                                     │ "
	@echo " │ make service  │ Run application without build                                       │ "
	@echo " │ make run      │ Run application without build                                       │ "
	@echo " │ make dev      │ Build application with development typescript settings              │ "
	@echo " │ make conf     │ init markus.conf template file                                      │ "
	@echo " │ make test     │ Test application with mocha and ts-node                             │ "
	@echo " │ make build    │ Clean up and build application with production typescript settings  │ "
	@echo " │ make ubuild   │ Build application with development typescript settings              │ "
	@echo " │ make host     │ Start mongodb service with default dbPath                           │ "
	@echo " │ make clean    │ Clean up                                                            │ "
	@echo " │ make cleanall │ Clean up include dependence files                                   │ "
	@echo " │ make install  │ Install dependences                                                 │ "
	@echo " └───────────────┴─────────────────────────────────────────────────────────────────────┘ "
	@echo ""

generate: buildScript
	@echo "[INFO] Generating Handler Documents"
	@node ./dist_script/gen/doc_handlers.js

conf: buildScript
	@echo "[INFO] Get template conf file"
	@node ./dist_script/cli/conf.js external

run:
	@echo "[INFO] Starting service"
	@node ./dist/script/service/markus.js

dev:
	@echo "[INFO] Building for development"
	@NODE_ENV=development $(tsc) --p $(dev)

build: clean install ubuild
	@echo '[INFO] To Start, Run: "./dist/script/service/markus.js"'

ubuild:
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)

script: buildScript

buildScript:
	@echo "[INFO] Building scripts"
	@NODE_ENV=production $(tsc) --p $(script)

host:
	@mongod --dbpath $(dbPath)

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test $(mocha)

cleanall: clean
ifeq ($(OS), Windows_NT)
	@echo "[INFO] Skipping"
else
	@echo "[INFO] Cleaning dependence files"
	@rm -rf node_modules
endif

clean:
ifeq ($(OS), Windows_NT)
	@echo "[INFO] Skipping"
else
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf dist_script
	@rm -rf .nyc_output
	@rm -rf coverage
endif

install: install-dep install-dev

install-dev:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-dep:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha)
