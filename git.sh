#! /usr/bin/bash

echo "<<<------->>>"
echo "    Before  "
echo "<<<------->>>"
git status
git add .
echo "<<<------->>>"
echo "    After   "
echo "<<<------->>>"
git status
echo "<<<------->>>"
echo "Enter commit message"
echo "<<<------->>>"
message=$@
git commit -m "$message"

