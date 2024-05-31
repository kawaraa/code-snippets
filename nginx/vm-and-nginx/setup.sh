set -v
# > resource of this setup
# > https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

# Step (1)
sudo apt update -y
# sudo apt install mysql-server -y
sudo apt install nginx -y
# sudo apt install git -y

# > # Step (2) Install NodeJS
# sudo curl -sL https://deb.nodesource.com/setup_12.x | bash -
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash
sudo apt install nodejs -y
# npm install -g npm@latest
# You may need to run this "sudo apt install build-essential" OR this "sudo apt install gcc g++ make"

# > # Step (3) Install pm2
sudo npm install -g pm2@latest

# > # Step (4) Setup the firewall (If digitalOcean)
# sudo ufw app list
# sudo ufw allow 'Nginx HTTP'
# sudo ufw allow 'Nginx HTTPs'
# sudo ufw status
# - (If digitalOcean) Enable and setup the firewall and make it accept inbound TCP, SSH, HTTP, HTTPS and outbound ICMP, ALL TCP, ALL UDP (follow this link, https://docs.digitalocean.com/products/networking/firewalls/how-to/configure-rules)

# > # Step (5) Clone the app
# > # Step (6) run: mysql < ~/path-to-mysql-statements-file/file-name.sql 

# > # Step (7) Create MySQL users
# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your-password';
# CREATE USER 'client'@'localhost' IDENTIFIED BY 'your-password';
# ALTER USER 'client'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your-password';
# GRANT ALL PRIVILEGES ON *.* TO 'client'@'localhost' WITH GRANT OPTION;
# FLUSH PRIVILEGES;
# systemctl status mysql.service
# sudo systemctl start, restart, reload, stop, status mysql.
# OR > sudo systemctl start mysql.service
# MySQL Databases Backup: mysqldump -u root -p databaseName > backupFileName.sql
# - If digitalOcean follow this link https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04

# > # Step (8) Configure NGINX
# sudo systemctl start, restart, reload, stop, status nginx
# sudo systemctl enable, disable nginx # to enable/disable the service to start up at boot
# > Files path: /var/www/domain-1/html/index.html
# > Configuration path: sudo vim /etc/nginx/sites-available/domain-1.conf
# > Link the configuration file to activate it: sudo ln -s /etc/nginx/sites-available/domain-1.conf /etc/nginx/sites-enabled/
# sudo vim /etc/nginx/nginx.conf and uncomment line: "server_names_hash_bucket_size 64;"
# > nginx -t test the configuration syntax if ok, run: sudo systemctl restart nginx
# rm /etc/nginx/sites-enabled/default & sudo systemctl reload nginx
# > set the default server bt adding this default_server after port in the server block
# nginx -t
# sudo systemctl reload nginx
# - (If digitalOcean follow this link https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04

# # Step (9) setup CI CD
# Github
# https://github.com/user_name/repository_name/settings/actions/runners/new?arch=x64&os=linux
# export RUNNER_ALLOW_RUNASROOT=“1”
# ./run.sh to test it.
# ./svc.sh install && ./svc.sh start 
# Gitlab
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys
# npm ci

# > # Step (10) Start the app with process control pm2
# > pm2 monit, list, start, restart, stop, info then the name of the process
pm2 start app.js --name processNname

# > # Step (10) Install CertBot to setup an HTTPS
# sudo add-apt-repository ppa:certbot/certbot
# sudo apt install python3-certbot-nginx
# sudo certbot --nginx -d kawaraa.com -d www.kawaraa.com
# sudo certbot --nginx -d hobby.kawaraa.com
# sudo certbot renew --dry-run

# > Set environment variables
# > Add the environment variables to the .bashrc file manually, then run: source .bashrc
# export NODE_ENV=production # Add this to .bashrc, .bashrc_profile or .profile file
# export DB_HOST=localhost
# export DB_USER=client
# export DB_PASS=client-psw

# > This print the VM IP address in case you need it
# curl -4 icanhazip.com

#========== If MySQL is running on the localhost ==========
# docker run --name myadmin -d -e PMA_HOST=localhost -p 8080:80 phpmyadmin

#========== If MySQL is running in a container ==========
# docker run --name myadmin -d --link mysql_db_server:db -p 8080:80 phpmyadmin
