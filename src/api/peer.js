import Peer from 'peerjs';

let instance = null;

export function createPeerInstance(id, iceServers) {
  instance = new Peer(id, {
    debug: 3,
    iceServers,
  });

  return instance;
}

export function getPeerInstance() {
  return instance;
}
