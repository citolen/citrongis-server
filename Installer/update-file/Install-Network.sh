echo "auto lo
iface lo inet loopback

#define network Interface for the only-host connection (citrongis-server <-- host)
auto eth1
iface eth1 inet static
address 192.168.56.101
netmask 255.255.255.0
network 192.168.56.0
broadcast 192.168.56.255
" >> interfaces
echo dev | sudo -S rm /etc/network/interfaces
echo dev | sudo -S mv interfaces /etc/network/interfaces
echo dev | sudo -S chmod 644 /etc/network/interfaces 