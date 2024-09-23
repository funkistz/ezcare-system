cmd="curl -s -v https://www.systemmy.ezcare-warranty.com/notification/sendPolicy3MonthsPushNotification -H 'Notifications' --stderr -"
result=`$cmd | grep "Test:"`
echo $result