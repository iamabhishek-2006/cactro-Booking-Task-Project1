const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const notificationQueue = new Queue("notification", {
  connection,
});

module.exports = notificationQueue;
