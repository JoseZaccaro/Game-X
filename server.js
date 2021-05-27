require('dotenv').config()
const express =require('express')
const cors = require ('cors')
const router = require('./routes/index')
require('./config/database')
const passport = require('passport')
require('./config/passport')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(express.static('assets'))


// app.post('/amigos', async (req, res) => {
//    const {nombre} = req.body
//    const {foto} = req.files

//    const nuevoAmigo = new Amigo({nombre})
//    const {_id} = nuevoAmigo

//    const fileName = _id + "." + foto.name.split(".")[foto.name.split(".").length-1]
//    const ruta = `${__dirname}/client/build/fotos/${fileName}`   

//    nuevoAmigo.foto = '/fotos/' + fileName
//    await nuevoAmigo.save()

//    foto.mv(ruta, err => {
//        console.log(err)
//        if (err) {
//            return res.json({success: false, respuesta: "Hubo un error al grabar el archivo"})
//        }
//        res.json({success: true})
//    })
   
// })

// app.delete('/amigos/:id', (req, res) => {
//     const fotoBorrar = `${req.params.id}.jpg`
//     fs.unlink(`${__dirname}/client/build/fotos/${fotoBorrar}`, err => {
//         if (err) {
//             return res.json({success: false, err})
//         }
//         res.json({success: true, mensaje: "Borrado!"})
//     })
// })

app.use('/api', router)


app.listen(4000, () => console.log("App listening on port 4000"))