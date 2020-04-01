import Peer from 'peerjs';
import iceServers from './ice.json';

let instance = null;

export function createPeerInstance(id) {
  instance = new Peer(id, {
    debug: 3,
    iceServers,
  });

  return instance;
}

export function getPeerInstance() {
  return instance;
}
