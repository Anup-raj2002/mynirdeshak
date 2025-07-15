import { config } from './variables.config';
import { Queue, QueueOptions } from 'bullmq';
import IORedis from 'ioredis';

export const redisConnection = new IORedis(config.redisHost, {
  port: config.redisPort,
  password: config.redisPwd,
  maxRetriesPerRequest: null
});

export function createQueue(name: string, options: Partial<QueueOptions> = {}) {
  return new Queue(name, {
    connection: redisConnection,
    ...options,
  });
} 