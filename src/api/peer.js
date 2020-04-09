import Peer from 'peerjs';
import { peerjs } from '@/config';

let instance = null;

const config = {};

Object.entries(peerjs).forEach(([key, value]) => {
  if (value) {
    config[key] = value;
  }
});

export function createPeerInstance(id, iceServers) {
  instance = new Peer(id, {
    ...config,
    debug: 3,
    iceServers,
  });

  return instance;
}

export function getPeerInstance() {
  return instance;
}
