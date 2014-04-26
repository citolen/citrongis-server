echo "rm -rf /home/dev/git
rm -rf /home/dev/.cconfig/cconfig
mkdir /home/dev/git
cd /home/dev/git
git clone https://github.com/citolen/citrongis-server.git
" > /home/dev/.cconfig/rebuild.sh
chmod +x /home/dev/.cconfig/rebuild.sh
echo "
alias rebuild-config='/home/dev/.cconfig/rebuild.sh'
" >> /home/dev/.bashrc