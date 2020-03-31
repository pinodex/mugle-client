import client from '@/api/client';

export default {
  async create(peerId) {
    return client.post('/sessions', { peerId });
  },
};
