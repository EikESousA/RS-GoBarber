import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import AppError from '@shared/errors/AppError';

import cacheConfig from '@config/cache';

const redisClient = redis.createClient({
	host: cacheConfig.config.redis.host,
	port: cacheConfig.config.redis.port,
	password: cacheConfig.config.redis.password,
});

const limiter = new RateLimiterRedis({
	storeClient: redisClient,
	keyPrefix: 'ratelimit',
	points: 5,
	duration: 1,
});

export default async function rateLimite(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	try {
		await limiter.consume(request.ip);
		return next();
	} catch (err) {
		throw new AppError('Too many requests', 429);
	}
}
