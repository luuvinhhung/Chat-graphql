import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import connectRedis from 'connect-redis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import {
  APP_PORT, IN_PROD, DB_PASSWORD, DB_USERNAME, SESS_NAME, SESS_SECRET, SESS_LIFETIME,
  REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
} from './config'

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0-tk0xu.mongodb.net/test?retryWrites=true`,
      { useNewUrlParser: true }
    )
    const app = express()
    app.disable('x-powered-by')
    // Authentication
    const RedisStore = connectRedis(session)
    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD
    })
    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: IN_PROD
      }
    }))
    const server = new ApolloServer({
      // These will be defined for both new or existing servers
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })
    server.applyMiddleware({ app, cors: false }) // app is from an existing express app
    app.listen({ port: APP_PORT }, () =>
      console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
