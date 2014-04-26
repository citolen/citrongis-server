# Creating autologin script
echo "#!/bin/bash
exec login -f dev" > autologin
echo dev | sudo -S mv autologin /sbin/autologin
echo dev | sudo -S chmod 755 /sbin/autologin

#Loading autologin script
cat /etc/init/tty1.conf | sed -e "s/exec \/sbin\/getty \-8 38400 tty1/exec \/sbin\/getty \-n \-l \/sbin\/autologin 38400 tty1/" > tmp.cfg
echo dev | sudo -S mv tmp.cfg /etc/init/tty1.conf