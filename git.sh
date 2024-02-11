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
echo "     END     "
echo "<<<------->>>"
message=$@
git commit -m "$message"

