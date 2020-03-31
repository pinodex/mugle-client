import axios from 'axios';
import { api } from '@/config';

import { makeShouldNotify, makeNotifyErrorMiddleware } from '@/api/middleware/notify-error';

const shouldNotify = makeShouldNotify({
  excludes: [],
});

const client = axios.create({
  baseURL: api.url,
});

client.interceptors.response.use(...makeNotifyErrorMiddleware(shouldNotify));

export default client;
