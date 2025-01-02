import { createClient } from "redis";
import customLog from "../utils/custom_log.js";
import exp from "constants";

class RedisClient {
    constructor() {
        this.client = createClient();
        this.isReady = true;

        this.client.on("error", (error) => {
            customLog.error(
                "Redis client not connected to the server: ",
                error
            );
            this.isReady = false;
        });
    }

    /**
     * @api {function} /db/redis.connect() connect
     * @apiGroup Models
     * @apiDescription This function connects the Redis client to the server.
     * @apiVersion 0.1.0
     */
    async connect() {
        this.client.connect();
        customLog.success("Redis client connected to the server");
    }

    /**
     * @api {function} /db/redis.isAlive() isAlive
     * @apiGroup Models
     * @apiDescription This function checks if the Redis client is connected to the server.
     * @apiVersion 0.1.0
     */
    async isAlive() {
        return this.isReady;
    }

    /**
     * @api {function} /db/redis.get(key) get
     * @apiGroup Models
     * @apiDescription This function retrieves a value from the Redis client.
     * @apiVersion 0.1.0
     */
    async get(key) {
        return this.client.get(key);
    }

    /**
     * @api {function} /db/redis.set(key, value) set
     * @apiGroup Models
     * @apiDescription This function sets a value in the Redis client.
     * @apiVersion 0.1.0
     */
    async set(key, value, duration = 0) {
        return this.client.set(key, value, "EX", duration);
    }

    /**
     * @api {function} /db/redis.del(key) del
     * @apiGroup Models
     * @apiDescription This function deletes a value from the Redis client.
     * @apiVersion 0.1.0
     */
    async del(key) {
        return this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;
