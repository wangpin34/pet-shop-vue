export PATH:=$(PWD)/node_modules/.bin:$(PATH)

.PHONY: All
.ONESHELL:

compile_contracts:
	truffle compile --config truffle-config.cjs

deploy_contracts: compile_contracts
	truffle migrate --config truffle-config.cjs

gen-contract-types:
	npx ts-node --esm gen.ts src

dev:
	vite

build:
	vue-tsc && vite build
