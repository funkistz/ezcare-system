cmd="curl -s -v https://www.systemmy.ezcare-warranty.com/policy/generateReport -H 'generateReport' --stderr -"
result=`$cmd | grep "Test:"`
echo $result