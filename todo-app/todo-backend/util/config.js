const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_URL = process.env.REDIS_URL || undefined

module.exports = {
  MONGO_URL: 'mongodb://root:example@localhost:3456/the_database',
  REDIS_URL: 'redis://localhost:6379'
}