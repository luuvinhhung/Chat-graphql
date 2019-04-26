const express = require('express')
const graphqlHTTP = require('express-graphql')
const {buildSchema} = require('graphql')
const db = {
    users: [
        {id: '1', name: 'Hung', email: 'abc@gmail.com', avatarUrl: 'google.com'},
        {id: '2', name: 'Chin', email: 'chin@gmail.com', avatarUrl: 'google.com'}
    ]
}
// dinh dang kieu data server tra về
const schema = buildSchema(`
    type Query {
        users: [User!]!
    }
    type User {
        id: ID!
        name: String
        email: String!
        avatarUrl: String
    }
`)
// query users return users from database
const rootValue = {
    users: () => db.users
}
const app = express()
// url localhost:3001/graphql
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    // true: giao diện graph <> false: return: {"data":{"users":[{"name":"Hung","id":"1"},{"name":"Chin","id":"2"}]}}
    graphiql: true
}))
app.listen(3001, () => console.log('run port 3001'))
// const { graphql, buildSchema } = require('graphql')
// const db = {
//     users: [
//         {id: '1', name: 'Hung', email: 'abc@gmail.com'},
//         {id: '2', name: 'Chin', email: 'chin@gmail.com'}
//     ]
// }
// const schema = buildSchema(`
//     type Query {
//         users: [User!]!
//     }
//     type User {
//         id: ID!
//         name: String
//         email: String!
//         avatarUrl: String
//     }
// `)
// const rootValue = {
//     users: () => db.users
// }
// graphql(
//     schema,
//     `
//         {
//             users {
//                 id
//                 email
//                 name
//             }
//         }
//     `,
//     rootValue
// ).then(
//     res => console.dir(res, {depth: null})
//     ).catch(console.error)