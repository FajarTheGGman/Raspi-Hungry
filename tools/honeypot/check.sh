sudo_login=$(tail ./tools/honeypot/auth.log | grep 'incorrect')
ssh_connection=$(tail ./tools/honeypot/auth.log | grep 'Failed password for')
time=$(date +"%T")

if [[ $ssh_connection ]]; then
    echo "$time [!] Someone trying to access the Pi with ssh" >> ./tools/honeypot/warning
elif [[ $ssh_connection ]]; then
    echo ''
fi


if [[ $sudo_login ]]; then
    echo '[!] someone trying to access the ROOT ! ' >> ./tools/honeypot/warning
elif [[ $sudo_login == '' ]]; then
    echo ''
fi
