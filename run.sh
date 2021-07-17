#!/bin/bash

IFS=$'\n'

VALUES=$(grep -E "(FROM|from) .+ (AS|as) .+" $1)

node ./src/index.js $VALUES