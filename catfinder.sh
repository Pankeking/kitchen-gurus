files=$(find components/ | grep .tsx)
files+=" "
files=$(find components/ | grep .ts)
files+=" "
files+=$(find app/ | grep .tsx)
files+=" "
files+=$(find app/ | grep .ts)
files+=" "
files+=$(find redux/ | grep .ts)
files+=" "
files+=$(find utils/ | grep .ts)

for file in $files
do
  found=$(cat $file | grep console.log) # query
  if [[ -z $found ]]
  then
    true # skip
  else
    echo $file # Found
  fi
done

