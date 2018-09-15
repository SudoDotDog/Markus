# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json
script := typescript/tsconfig.script.json

dbPath := F:/db/

# NPX functions
ifeq ($(OS), Windows_NT)
	tsc := .\node_modules\.bin\tsc
	mocha := .\node_modules\.bin\mocha
else
	tsc := node_modules/.bin/tsc
	mocha := node_modules/.bin/mocha
endif

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
	@$(tsc) --p $(dev)

build: clean install ubuild
	@echo '[INFO] To Start, Run: "./dist/script/service/markus.js"'

ubuild:
	@echo "[INFO] Building for production"
	@$(tsc) --p $(build)

script: buildScript

buildScript:
	@echo "[INFO] Building scripts"
	@$(tsc) --p $(script)

host:
	@mongod --dbpath $(dbPath)

tests:
	@echo "[INFO] Testing with Mocha"
ifeq ($(OS), Windows_NT)
	@setx NODE_ENV test
else
	@NODE_ENV=test
endif
	@$(mocha)

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
	# @rd /s /q .\dist
	# @rd /s /q .\dist_script
	# @rd /s /q .\.nyc_output
	# @rd /s /q .\coverage
else
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf dist_script
	@rm -rf .nyc_output
	@rm -rf coverage
endif

install:
	@echo "[INFO] Installing Dependences"
	@npm install
	@npm install --only=dev
