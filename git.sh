#! /usr/bin/bash

push=false
message=""

while getopts ":p" opt; do
  case $opt in
    p) 
      push=true
      message=$2
      shift
      ;;
    \?) 
      echo "Invalid option: closing"
      exit 1
      ;;
  esac
done
if [[ -z $message ]]; then
  message=$1
fi

echo "<<<------->>>"
echo "    BEFORE  "
echo "<<<------->>>"
git status
git add .
echo "<<<------->>>"
echo "    AFTER   "
echo "<<<------->>>"
git status
echo "<<<------->>>"
echo "     END     "
echo "<<<------->>>"

git commit -m "$message"

if [[ $push == true ]]; then
  git push
  pushMsg="and pushed"
fi

echo "Commited $pushMsg successfully"