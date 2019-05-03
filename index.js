// const { ApolloServer, gql } = require('apollo-server')
// const crypto = require('crypto')
// const db = {
//   users: [
//     { id: '1', name: 'Hung', email: 'abc@gmail.com', avatarUrl: 'google.com' },
//     { id: '2', name: 'Chin', email: 'chin@gmail.com', avatarUrl: 'google.com' }
//   ],
//   messages: [
//     { id: '1', userId: '1', body: 'Hello', createAt: Date.now() },
//     { id: '2', userId: '1', body: 'World', createAt: Date.now() },
//     { id: '3', userId: '2', body: 'I\'m 2\'s', createAt: (Date.now()) }
//   ]
// }
// // dinh dang kieu data server tra về [User!]!: arr && obj ko dc null
// const typeDefs = gql`
//     type Query {
//         users: [User!]!
//         user(id: ID!): User
//         messages: [Message!]!
//     }
//     type Mutation {
//         addUser(email: String!, name: String): User
//     }
//     type User {
//         id: ID!
//         name: String
//         email: String!
//         avatarUrl: String
//         messages: [Message!]!
//     }
//     type Message {
//         id: ID!
//         userId: ID!
//         body: String
//         createAt: String
//     }
// `
// // class User {
// //     constructor(user) {
// //         Object.assign(this, user)

// //     }
// //     messages() {
// //         return db.messages.filter(mess => mess.userId === this.id)
// //     }
// // }
// // query users return users from database
// const resolvers = {
//   Query: {
//     users: () => db.users,
//     // argument dau tien la root
//     user: (root, { id }) => db.users.find(user => user.id === id),
//     messages: () => db.messages
//   },
//   Mutation: {
//     addUser: (root, { email, name }) => {
//       const user = {
//         id: crypto.randomBytes(10).toString('hex'),
//         email,
//         name
//       }
//       db.users.push(user)
//       return user
//     }
//   },
//   User: {
//     messages: (user) => db.messages.filter(mess => mess.userId === user.id)
//   }
// }
// const server = new ApolloServer({ typeDefs, resolvers })
// server.listen().then(({ url }) => console.log(url))
// // const app = express()
// // // url localhost:3003/graphql
// // app.use('/graphql', graphqlHTTP({
// //     schema,
// //     rootValue,
// //     // true: giao diện graph <> false: return: {"data":{"users":[{"name":"Hung","id":"1"},{"name":"Chin","id":"2"}]}}
// //     graphiql: true
// // }))
// // app.listen(3003, () => console.log('run port 3003'))
import './src'
