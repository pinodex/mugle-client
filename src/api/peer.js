import Peer from 'peerjs';

let instance = null;

export function createPeerInstance(id) {
  instance = new Peer(id);
}

export function getPeerInstance() {
  return instance;
}
