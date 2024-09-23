cmd="curl -s -v https://www.systemmy.ezcare-warranty.com/notification/sendtestnotification -H 'Notifications' --stderr -"
result=`$cmd | grep "Test:"`
echo $result