This guide describes steps to add a new ipfs node and a new cluster node in the exitinb private IPFS cluster network.

1. Install docker-compose on Ubuntu (Debian based linux OS)

1.1 Install docker-compose
```
sudo apt install -y docker-compose
```
1.2 Add your user to Docker group so that docker commands can be run from your user
```
sudo usermod -a -G docker $USER
```
1.3 Restart the terminal to load new conf

2. We will need swarm key of the existing setup to set env var SWARM_KEY in docker-compose.yml.
We will need CLUSTER_SECRET of the existing setup to set env var CLUSTER_SECRET in docker-compose.yml.
Replace the keys in the new node section and start the nodes

Now run following command with above two vars set in docker-compose.yml to build and run the new IPFS node and a Cluster node
```
docker-compose up -d --build
```
This will create the images of IPFS and IPFS-cluster and start them in the background. To stop run ```docker-compose down``` and subsequent start will be done by ``` docker-compose up -d ```. IPFS configuration files will be stored/mapped in /home/$USER/.compose/ipfs0 and cluster configuration will be mapped/stored in /home/$USER/.compose/cluster0.

3. Verify the cluster status by running following command
```
docker container exec cluster0 ipfs-cluster-ctl peers ls
```

It should display runing nodes with peers connected to it. A cluster with two members gives following out put

```
$ docker container exec cluster0 ipfs-cluster-ctl peers ls
12D3KooWJrFYdHcjLCGCgqZaCFV2wyopFfYbj5CYr6X7v8sLgQZt | cluster0 | Sees 1 other peers
  > Addresses:
    - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWJrFYdHcjLCGCgqZaCFV2wyopFfYbj5CYr6X7v8sLgQZt
    - /ip4/192.168.240.4/tcp/9096/p2p/12D3KooWJrFYdHcjLCGCgqZaCFV2wyopFfYbj5CYr6X7v8sLgQZt
  > IPFS: 12D3KooWD9cpdR5wkdSmJ4qfdVoHq6qE4usmBrBYBaYc3gXHSZbV
    - /ip4/127.0.0.1/tcp/4001/p2p/12D3KooWD9cpdR5wkdSmJ4qfdVoHq6qE4usmBrBYBaYc3gXHSZbV
12D3KooWJv96qg3ef5wTrKFLj2iQ5iyhFK6qBuZ4Z7nj93vC3xti | cluster1 | Sees 1 other peers
  > Addresses:
    - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWJv96qg3ef5wTrKFLj2iQ5iyhFK6qBuZ4Z7nj93vC3xti
    - /ip4/192.168.240.5/tcp/9096/p2p/12D3KooWJv96qg3ef5wTrKFLj2iQ5iyhFK6qBuZ4Z7nj93vC3xti
  > IPFS: 12D3KooWBMTYqLBgiJexPgzge4pmLGQAEtXwNWtkn56sJkMEnKBe
    - /ip4/127.0.0.1/tcp/4001/p2p/12D3KooWBMTYqLBgiJexPgzge4pmLGQAEtXwNWtkn56sJkMEnKBe
    - /ip4/192.168.240.3/tcp/4001/p2p/12D3KooWBMTYqLBgiJexPgzge4pmLGQAEtXwNWtkn56sJkMEnKBe
```


