const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const server = require('./server');
const gql = require('graphql-tag');

const { xmlUploader } = require('./uploaders');
const fileUpload = require('express-fileupload');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const users = require('./data');
//const db = require('./lib/postgres-uploaders');
//const cors = require('cors');
//const https = require('https');
//import { createWriteStream } from 'fs';

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
});

app.use(bodyParser.json());

app.use(fileUpload({
    createParentPath: true
}));

async function UploadXML (file) {
            const { data, name, mimetype, size } = await file;

            const uri = await xmlUploader.upload({
             data,
             name,
             mimetype,
            });                           

            return {
             name,
             mimetype,
             uri, 
             }; 
            };

app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
        	console.log(req.headers)
            res.send({
                status: false,
                message: 'Hi'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
           let incomingFile = req.files.file;
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            //avatar.mv('./uploads/' + incomingFile.name);
            
            
           UploadXML(incomingFile)

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: incomingFile.name,
                    mimetype: incomingFile.mimetype,
                    size: incomingFile.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
app.post('/save_number', async (req, res) => {
    try {
        if(!req.body.phone) {
            res.send({
                status: false,
                message: 'Nope'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
           let incomingPhone = req.body.phone;
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            //avatar.mv('./uploads/' + incomingFile.name);
            try {
            	const result = await db.query('INSERT INTO contacts (phone_number) VALUES ($1)', [incomingPhone]);
                res.send('Records created successfully')
            } catch (err) {
            	res.status(500).send(err);
            }
          }
    } catch (err) {
        res.status(500).send(err);
    }
});

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
    });

*/