const express = require('express');
require('dotenv').config()
const { expressMiddleware } = require("@apollo/server/express4")
const bodyParser = require('body-parser');
const graphQlServer = require('./graphql')
const sequelize = require('./util/database')
const app = express();
app.use(bodyParser.json());


async function init() {
    app.get('/', (req, res) => {
        res.send("hello ! ")
    })

    const User = require('./model/users')
    const jwt = require('jsonwebtoken')

    app.use('/graphql', expressMiddleware(await graphQlServer(), {
        context: async ({ req }, res) => {
            const token = req.headers['token'];
            try {
                const decodeToken = jwt.verify(token, "8uu**jhjhjfds")
                console.log(decodeToken)
                const user = await User.findByPk(decodeToken.id);
                if (!user) {
                   return {}
                }
                return user 
            }
            catch (err) {
                return {}
            }

        }
    }))


    sequelize.
        sync()
        .then(res => {
            app.listen(process.env.PORT_NAME, () => console.log('server Running on port',process.env.PORT_NAME))
        })
        .catch(err => console.log("erro om data connection", err))
}

init()