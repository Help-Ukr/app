#!/bin/bash

OUT=./generated/api.d.ts

echo '/// <reference path="./api.override.d.ts" />' > $OUT
echo 'namespace API {' >> $OUT
echo >> $OUT
yarn --silent openapi-typescript https://api.tiny-crm.biz.ua/docs/api-docs.json >> $OUT
echo '}' >> $OUT
echo >> $OUT
