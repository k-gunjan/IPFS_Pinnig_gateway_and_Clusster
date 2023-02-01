# Create an IPFS Image for private IPFS Node 
# if env var PRIVATE_PEER_MUL_ADDR is set then
# it will remove all preset (public) bootstrap peers and add this to bootstrap list
FROM ipfs/kubo:v0.15.0

# Enforce private network settings
ENV LIBP2P_FORCE_PNET 1
ENV IPFS_PROFILE server

ADD 001-ipfs-setup.sh /container-init.d/001-ipfs-setup.sh
RUN chmod a+x /container-init.d/001-ipfs-setup.sh


EXPOSE 8080
EXPOSE 4001
EXPOSE 5001
