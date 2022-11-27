require('dotenv').config()
const express = require('express')
const bp = require('body-parser')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: true })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
