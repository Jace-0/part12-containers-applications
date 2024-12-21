const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync
let client

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  client = redis.createClient({ 
    url: REDIS_URL,
    legacyMode: true  // Add this for older Redis client compatibility
  })

  client.on('error', (err) => console.log('Redis Client Error', err))
  client.on('connect', () => console.log('Connected to Redis'))

  // Connect to Redis
  client.connect().catch(console.error)

  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)
}

module.exports = {
  getAsync,
  setAsync
}