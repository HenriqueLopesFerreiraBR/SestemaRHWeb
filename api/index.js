const express = require('express')
const app = express()
const cors = require('cors')
const Config = require('./src/config/variable')
const BodyParser = require('body-parser')
const mongoose = require('mongoose')
const database = require('./src/database/conection')

const port = Config.port

const AuthRouter = require('./src/routes/authRouter');
const UserRouter = require('./src/routes/userRouter');
const EmployeeRouter = require('./src/routes/employeeRouter');


app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended:true}))


database.connect;


app.use('/api/auth',AuthRouter)
app.use('/api/user',UserRouter)
app.use('/api/employee',EmployeeRouter)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))