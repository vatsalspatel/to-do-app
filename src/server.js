const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())

app.get('/api/get-to-dos', (req, res) => {
    fs.readFile("src/data.json", "utf-8", (err, data) => {
        const todos = JSON.parse(data)
        const todosArr = []

        Object.keys(todos).sort((a,b) => {return parseInt(a)-parseInt(b)}).forEach((key) => {
            todosArr.push({id: key, value: todos[key]})
        })

        res.send(todosArr)
    })
})

app.post('/api/post-to-do', (req, res) => {
    fs.readFile("src/data.json", "utf-8", (err, data) => {
        const todos = JSON.parse(data)
        
        const newId = parseInt(Object.keys(todos).sort((a,b) => {return parseInt(a)-parseInt(b)}).slice(-1))

        if (isNaN(newId)) {
            todos[1] = req.body.value
        } else {
            todos[newId+1] = req.body.value
        }

        const newData = JSON.stringify(todos)
        fs.writeFile("src/data.json", newData, (err, data) => {})

        res.json({"Status": "Ok"})
    })
})

app.post('/api/post-to-do-rm', (req, res) => {
    fs.readFile("src/data.json", "utf-8", (err, data) => {
        const todos = JSON.parse(data)
        const id = req.body.id
        
        delete todos[id]
        fs.writeFile("src/data.json", JSON.stringify(todos), (err, data) => {})

        res.json({"Status": "Ok"})
    })
})

app.listen("5000", () => {
    console.log('Server started on port 5000.')
})