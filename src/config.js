export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'admin',
  DB_PASSWORD = '123',
  DB_HOST = 'localhost',
  // DB_PORT = 27017,
  // DB_NAME = 'chat',

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret!',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = 'redis-17417.c14.us-east-1-2.ec2.cloud.redislabs.com',
  REDIS_PORT = 17417,
  REDIS_PASSWORD = '5ud6M9OtaTtRW17KFl97Lvjx6WuAft8j'

} = process.env

export const IN_PROD = NODE_ENV === 'production'
