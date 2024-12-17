#!/bin/bash

for file in tests/*.js; do
  k6 run "$file"
done
