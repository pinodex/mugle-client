import client from '@/api/client';

export default {
  async all() {
    return client.get('/ice-servers');
  },
};
