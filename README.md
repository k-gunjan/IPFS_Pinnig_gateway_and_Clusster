This repo has two sections
A. setup the first ipfs-node & cluster-node of the private ipfs cluster
B. setup the new memer ipfs-node & cluster-node of the private ipfs cluster
C. gateway api for the cluster pinning service
D. IPFS gateway for file access in public

All the steps are same for both the types excetp the secret keys which are generated for use in the case of first node and there are no bootstrap nodes for both ipfs and the cluster. For subsequent new nodes the same keys are used and the first node acts as the bootstrap node.

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
Use following command to generate the private swarm key (hex encoded 32 bytes random string) if this is the first node in the private ipfs swarm. Use existing keys of the network in case you want to connect it an  existing private network. 
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

Now run following command to build and run the IPFS-node Cluster-node, Cluster-gateway and  IPFS-gateway.
```
docker-compose up -d --build
```
This will create the images of IPFS and IPFS-cluster and start them in the background. To stop run ```docker-compose down``` and subsequent start will be done by ``` docker-compose up -d ```. IPFS configuration files will be stored/mapped in /home/$USER/.compose/ipfs0 and cluster configuration will be mapped/stored in /home/$USER/.compose/cluster0.

Verify the cluster status by running following command
```
docker container exec cluster0 ipfs-cluster-ctl peers ls
```


#####  very important  #####
Change the keys used in the repo. generate new one by runing following bash command

```
echo -e "`tr -dc 'a-f0-9' < /dev/urandom | head -c64`"
```

For more info on IPFS visit https://docs.ipfs.tech/
For more info on IPFS cluster visit https://ipfscluster.io/documentation/

