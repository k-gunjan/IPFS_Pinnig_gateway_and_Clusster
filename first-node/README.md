This guide describes steps to add first ipfs node and first cluster node in the private IPFS cluster network.

1.Install docker-compose on Ubuntu (Debian based linux OS)

1.1 Install docker-compose
```
sudo apt install -y docker-compose
```
1.2 Add your user to Docker group so that docker commands can be run from your user
```
sudo usermod -a -G docker $USER
```
1.3 Restart the terminal to load new conf

#IPFS Node 
Use following command to generate the private swarm key (hex encoded 32 bytes random string) if this is the first node in the private ipfs swarm
```
echo -e "`tr -dc 'a-f0-9' < /dev/urandom | head -c64`"
```
Sample Output:
```
2c2fa323fd396ac146abac7c7b9a99d2ca4a035644ab5207ed22570ff5bf8aa7
``` 
We will use this swarm key string in docker-compose.yml to set env var SWARM_KEY

#IPFS-Cluster Node 
Run the command again to generate an other key for private IPFS-cluster and use in docker-compose.yml file to set env var  CLUSTER_SECRET

If you want to connect to existing node or if this is not the first node then seek the secret keys for ipfs and cluster from the admin and  use the key to join the network. 

Now run following command to build and run the first IPFS node and a Cluster node
```
docker-compose up -d --build
```
This will create the images of IPFS and IPFS-cluster and start them in the background. To stop run ```docker-compose down``` and subsequent start will be done by ``` docker-compose up -d ```. IPFS configuration files will be stored/mapped in /home/$USER/.compose/ipfs0 and cluster configuration will be mapped/stored in /home/$USER/.compose/cluster0.

Verify the cluster status by running following command
```
docker container exec cluster0 ipfs-cluster-ctl peers ls
```


