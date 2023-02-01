#!/bin/sh
#set -ex

if [ -z ${PRIVATE_PEER_MUL_ADDR+x} ]; then 
    echo "PRIVATE_PEER_MUL_ADDR is not set"; 
else 
    echo "Adding a private peer : '$PRIVATE_PEER_MUL_ADDR'"; 
    # remove all predefined peers 
    ipfs bootstrap rm all;
    #ref format: "/ip4/$PRIVATE_PEER_IP_ADDR/tcp/4001/ipfs/$PRIVATE_PEER_ID"
    ipfs bootstrap add $PRIVATE_PEER_MUL_ADDR;
fi




##prepare swarm key file
if [ -z ${SWARM_KEY+x} ]; then 
    echo "ipfs SWARM_KEY is not set"; 
else
    echo "adding swarm key"; 
    echo -e "/key/swarm/psk/1.0.0/\n/base16/\n$SWARM_KEY" >/data/ipfs/swarm.key 
fi