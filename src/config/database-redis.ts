import { createClient, RedisClientType } from "redis";

export let redis: RedisClientType;

connectRedis();

export async function connectRedis() {
  try {
    redis = createClient();
    await redis.connect();
  } catch (err) {
    console.log(err);
  }
}

export async function disconnectRedis(): Promise<void> {
  await redis?.disconnect();
}
