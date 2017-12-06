#!/bin/sh
rm -rf build
truffle compile
while ! curl -s ganache:8545 > /dev/null; do echo waiting for ganache; sleep 3; done;
truffle migrate
truffle deploy
npm run dev
