const express = require('express');
const app = express();
const server = require('./server');
const users = require('./data');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
});

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'));


app.post('/get-token', async (req, res) => {
    const { email, password } = req.body
    const user = users.find(user => user.email === email)
    if (user) {
    //we use bcrypt to compare the hash in the database (mock.js) to the password the user provides
        const match = await bcrypt.compare(password, '$2b$10$9wKe8u.lQ06Sx0/nKXuVdO1y9JFQouOPT.fuNpK1Y3J.xbzCDcic6')
        if (match) {
            //we create the JWT for the user with our secret
            //inside the token we encrypt some user data
            //then we send the token to the user
            const token = jwt.sign({ email: user.email, id: user.id }, '12345')
            res.send({
                success: true,
                token: token,
            })
        } else {
            //return error to user to let them know the password is incorrect
            res.status(401).send({
                success: false,
                message: 'Incorrect credentials',
            })
        }
    } else {
        //return error to user to let them know the account there are using does not exists
        res.status(404).send({
            success: false,
            message: `Could not find account: ${email}`,
        })
    }
    })