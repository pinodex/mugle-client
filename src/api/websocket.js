import { Client } from '@hapi/nes/lib/client';
import { ws } from '@/config';

let client = null;

export const TYPE_PRESENCE = 'presence';
export const TYPE_READY = 'ready';

/**
 * Get Nes Client instance
 *
 * @return {Client}
 */
export function getWsClient() {
  if (client === null) {
    client = new Client(ws.url);
  }

  return client;
}

/**
 * Send message
 *
 * @param  {String} type
 * @param  {Object} data
 */
export async function sendMessage(type, data = null) {
  return client.message({ type, data });
}

/**
 * Send presence
 */
export async function sendPresence() {
  return sendMessage(TYPE_PRESENCE);
}

/**
 * Send ready
 */
export async function sendReady() {
  return sendMessage(TYPE_READY);
}
