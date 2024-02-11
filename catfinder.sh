files=$(find components/ | grep .tsx)
files+=" "
files+=$(find app/ | grep .tsx)

for file in $files
do
  found=$(cat $file | grep borderC) # query = resizeMode
  if [[ -z $found ]]
  then
    true # skip
  else
    echo $file # Found
  fi
done

