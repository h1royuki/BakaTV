const redis = require('redis').createClient();
const { promisify } = require('util');

module.exports = {
    get: promisify(redis.get).bind(redis),
    set: promisify(redis.set).bind(redis),
    del: promisify(redis.del).bind(redis),
    zadd: promisify(redis.zadd).bind(redis),
    zcount: promisify(redis.zcount).bind(redis),
    zrange: promisify(redis.zrange).bind(redis),
    zrangebyscore: promisify(redis.zrangebyscore).bind(redis),
    zrem: promisify(redis.zrem).bind(redis),
    zremrangebyscore: promisify(redis.zremrangebyscore).bind(redis)

}