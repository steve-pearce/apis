const asyncRedis = require('async-redis');
require('dotenv').config();
const url = require('url');
const redisURL = process.env.REDISCLOUD_URL
  ? url.parse(process.env.REDISCLOUD_URL)
  : console.log('No redis url found');
const client = redisURL
  ?  asyncRedis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true })
  :  asyncRedis
      .createClient()
      .then(console.log('No redis url found. Connecting to local redis server instead.'));
process.env.REDISPASS
  ? client.auth(process.env.REDISPASS)
  : console.log('No redis password found.');

client.on('connect', () => console.log('Connected to redis'));

// Convert object to string if value is an object
// if a time to live is defined then give the data a time to expire
const set = async (key: string, value: any, ttl?: any) => {
  const valueToInsert = typeof value == 'string' ? value : JSON.stringify(value);
  !ttl ? await client.set(key, valueToInsert) : await client.set(key, valueToInsert, 'EX', ttl);
};

const get = async (key: string) => {
  const result = await client.get(key);
  try {
    return JSON.parse(result);
  } catch (error) {
    return result;
  }
};

export const redis = {
  set,
  get,
};
