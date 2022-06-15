const db = require('./db/db')
const express = require('express')
const { Prospect, syncAndSeed } = db
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 2022
app.use(express.static('src'))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form

const init = async () =>{
    await syncAndSeed()
}
init()

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.delete('/api/prospects/:id', async(req, res)=>{
    try{
        const prospect = await Prospect.findByPk(req.params.id)
        await prospect.destroy()
        res.sendStatus(204)
    }
    catch(err){
        console.log(err)
    }
})

app.put('/api/prospects/:id', async(req, res)=>{
    try{
        const prospect = await Prospect.findByPk(req.params.id)
        if (prospect){
        prospect.update(req.body)
        res.sendStatus(200)
        } else {
            res.send('prospect isnt here')
        }
    }
    catch(err){
        console.log(err)
    }
})

app.get('/api/prospects', async (req, res)=>{
    res.send(await Prospect.findAll())
})

app.post('/api/prospects', async(req, res)=>{
    try{
        res.sendStatus(201).send(await Prospect.create(req.body))
    }
    catch(err){
        console.log(err)
    }
})