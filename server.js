const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const escapeHtml = require('escape-html')
const path = require('path');
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000
const DATABASE_LINK = process.env.DATABASE_LINK
// const PORT = 3000

//MIDLEWARE PARA DEFINIR CONTENT-SECURITY-POLICY
app.use(
    helmet({
        contentSecurityPolicy:{
            directives:{
                defaultSrc: ["'self'"],//APENAS RECURSOS DO PRÓPRIO DOMÍNIO
                scriptSrc: ["'self'"],//BLOQUEIA SCRIPTS INLINE E EXTERNOS
                // scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
            }
        }
    })
)

app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static("public"))

// app.post('/', (req, res) => {
//     comments.push(escapeHtml(req.body.comment))
//     res.redirect('/')
// })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

mongoose.connect(DATABASE_LINK)
.then(() => console.log('Database Connected!'))
.catch(error => console.log(error.message));

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
