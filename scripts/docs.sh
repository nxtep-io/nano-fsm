#!/bin/bash

export DOCS_NAME="$(echo "console.log(require(\"./package.json\").name)" | node)";
export DOCS_VERSION="$(echo "console.log(require(\"./package.json\").version)" | node)";
echo "Generating documentation for $DOCS_NAME@$DOCS_VERSION...";
./node_modules/.bin/typedoc --name "$DOCS_NAME (v$DOCS_VERSION)" --mode file --out ./docs --theme node_modules/nxtep-typedoc-theme/bin lib/index.ts;