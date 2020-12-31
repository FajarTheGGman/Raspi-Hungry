blue='\033[34;1m'
green='\033[32;1m'
purple='\033[35;1m'
cyan='\033[36;1m'
red='\033[31;1m'
white='\033[37;1m'
yellow='\033[33;1m'

echo $green"{ Raspi-Hungry Instalation... :) }"
sleep 1
echo $yellow"Please wait....."
sleep 1
sudo apt-get install nmap nodejs -y
npm install

echo $green"[+] Well done.."
