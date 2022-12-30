require("dotenv").config()
const express = require("express")
const app = express()
const {ServiceUtils} = require("./Services/serviceUtils")
const cors = require("cors")
const PORT = ServiceUtils.getPort()
const HOST = ServiceUtils.getHost()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/user', (req,res) => {
    const date = new Date()
    console.log({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minute: date.getMinutes(),
        seconds: date.getSeconds()
    })
    const user_info = {
        ...req.body,
        time: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} || ${date.getHours() + 1}:${date.getMinutes()}:${date.getSeconds()}`
    }
    res.status(201).json({message: "success"})
    console.log("<------user_info",user_info,"<------user_info")
})
app.get('/', (req,res) => {
    res.send("<h1>Bear&Balloons</h1>")
})

app.listen(PORT, () => {
    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
})