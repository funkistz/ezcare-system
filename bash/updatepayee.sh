cmd="curl -s -v https://www.systemmy.ezcare-warranty.com/policy/generatePayee -H 'generatePayee' --stderr -"
result=`$cmd | grep "Test:"`
echo $result