import Peer from 'peerjs';
import { peerjs } from '@/config';

let instance = null;

const config = {};

Object.entries(peerjs).forEach(([key, value]) => {
  if (value) {
    config[key] = value;
  }
});

const prepareIceServers = (iceServers) => iceServers.map((server) => {
  const newServer = {};

  Object.entries(server).forEach(([key, value]) => {
    if (value) {
      newServer[key] = value;
    }
  });

  return newServer;
});

export function createPeerInstance(id, iceServers) {
  instance = new Peer(id, {
    ...config,
    debug: 3,
    config: {
      iceServers: prepareIceServers(iceServers),
    },
  });

  return instance;
}

export function getPeerInstance() {
  return instance;
}
