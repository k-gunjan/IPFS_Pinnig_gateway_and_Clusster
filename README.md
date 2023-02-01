This repo has two sections
1. setup the first node of the private ipfs cluster
2. setup the new memer of the private ipfs cluster

All the steps are same for both the types excetp the secret keys which are generated for use in the case of first node and there are no bootstrap nodes for both ipfs and the cluster. For subsequent new nodes the same keys are used and the first node acts as the bootstrap node.

#####  very important  #####
Change the keys used in the repo. generate new one by runing following bash command

```
echo -e "`tr -dc 'a-f0-9' < /dev/urandom | head -c64`"
```

For more info on IPFS visit https://docs.ipfs.tech/
For more info on IPFS cluster visit https://ipfscluster.io/documentation/

