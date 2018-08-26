build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json
dbPath := F:/db/
ifeq ($(OS), Windows_NT)
	tsc := .\node_modules\.bin\tsc
else
	tsc := node_modules/.bin/tsc
endif


markus: dev run

run:
	@echo "[INFO] Starting service"
	@node ./dist/script/service/markus.js

dev:
	@echo "[INFO] Building for development"
	@$(tsc) --p $(dev)

build: clean ubuild

ubuild:
	@echo "[INFO] Building for production"
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
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf .nyc-output
	@rm -rf coverage
endif

install:
	@echo "[INFO] Install Dependences"
	@npm install
	@npm install --only=dev