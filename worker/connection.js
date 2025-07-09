const { Queue, Worker, QueueScheduler } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config();

const redisConnection = new IORedis(process.env.REDIS_HOST, {
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PWD || undefined,
  maxRetriesPerRequest: null
});

function createQueue(name, options = {}) {
  return new Queue(name, {
    connection: redisConnection,
    ...options,
  });
}

module.exports = {
  redisConnection,
  createQueue,
  Queue,
  Worker,
  QueueScheduler,
}; 