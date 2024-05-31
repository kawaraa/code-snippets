set -v
# > resource of this setup
# > https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

sudo apt-get update -y
sudo apt update -y

## ======== way 1 to Install docker  =======

# > Install docker
# curl -sS https://get.docker.com/ | sh


#========== way 2 Install abd setup docker ==========
# > Install docker
# curl -sS https://get.docker.com/ | sh

# > Install docker-compose
# sudo -i curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin docker-compose chmod +x /usr/local/bin/docker-compose

# > Install docker
# sudo apt-get purge docker-ce docker-ce-cli containerd.io.


## ======== way 3 to Install docker =======

# > Install docker
# Source: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04
# Next, install a few prerequisite packages which let apt use packages over HTTPS
sudo apt install apt-transport-https ca-certificates curl software-properties-common
# Then add the GPG key for the official Docker repository to your system
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# Add the Docker repository to APT sources
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
# Next, update the package database with the Docker packages from the newly added repo
sudo apt update
# Finally, install Docker
sudo apt install docker-ce
# Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running
sudo systemctl status docker
# If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group
sudo usermod -aG docker ${USER}
# To apply the new group membership, log out of the server and back in, or type the following
su - ${USER}

# > Install docker-compose
# The following command will download the 1.27.4 release and save the executable file at /usr/local/bin/docker-compose, which will make this software globally accessible as docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# Next, set the correct permissions so that the docker-compose command is executable
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# > Uninstall docker
# sudo apt-get purge docker-ce docker-ce-cli containerd.io.
