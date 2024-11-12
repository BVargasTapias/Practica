const express = require("express");
const bodyParser = require("body-parser");
const mysql2 = require("mysql2/promise");
const path = require('path');
const moment = require('moment');
const session = require('express-session')

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static((__dirname, '../front')));
app.use(express.static(path.join(__dirname, '../front')));

//Configurar la Sesión

app.use(session({
  secret: 'Miapp',
  resave: false,
  saveUninitialized: true
}))

//Conexion bbdd
const db = {
  host: "localhost",
  user: "root",
  password: "",
  database: "BBDD_Manzanas_Del_Cuidado",
};


//Registrar usuario
app.post('/crear', async (req, res) => {

  const { nombre, tipodedocumento, documento, manzana, telefono, correo, direccion, ocupacion } = req.body
  try {
    //Verificar el usuario
    const conect = await mysql2.createConnection(db)
    const [ver] = await conect.execute(`SELECT * FROM Usuario WHERE Usu_NumeroDocumento=? AND Usu_TipoDocumento=?`, [documento, tipodedocumento])


    if (ver.length > 0) {

      res.status(409).send(`<script>
        window.onload = function(){
            alert("Usuario ya existe")
            window.location.href = './inicio.html'
        }
    </script>`)
    }
    else {
      await conect.execute('INSERT INTO Usuario (Usu_NombreCompleto, Usu_TipoDocumento, Usu_NumeroDocumento, Usu_Telefono, Usu_CorreoElectronico, Usu_Direccion, Usu_Ocupacion,FK_ID_Manzanas) VALUES (?,?,?,?,?,?,?,?)', [nombre, tipodedocumento, documento, telefono, correo, direccion, ocupacion, manzana])
      res.status(201).send(`<script>
        window.onload = function(){
            alert("Datos guardados")
            window.location.href = './inicio.html'
        }
    </script>`)

    }
    await conect.end()
  }
  catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).send("Error en el servidor")
  }

})
/* const jhon = `INSERT INTO Usuario (Usu_NombreCompleto, Usu_TipoDocumento, Usu_NumeroDocumento, Usu_Ciudad, Usu_Telefono, Usu_CorreoElectronico, Usu_Direccion, Usu_Ocupacion) VALUES (?,?,?,?,?,?,?,?)`
db.query(jhon, [nombre, tipodedocumento, documento, manzana, telefono, correo, direccion, ocupacion], (err, result) => {
  if (err) {
    console.error(err);
    res.status(500).send("pailas")
    return
  }
  console.log("Szs")
}) */

//Enviar pagina de usuario

app.post('/sesion', async (req, res) => {
  const {
    documento, tipodedocumento } = req.body
  try {
    const conect = await mysql2.createConnection(db)
    const [datos] = await conect.execute(`SELECT * FROM Usuario WHERE Usu_NumeroDocumento=? AND Usu_TipoDocumento=?`, [documento, tipodedocumento])
    console.log(datos)
    if (datos.length > 0) {
      //const [manzana] = conect.execute('SELECT manzanas.Man_Nombre FROM usuario INNER JOIN manzanas ON usuario.ID_Manzanas=manzanas  WHERE usuario.Usu_NombreCompleto=?', [datos[0].Usu_NombreCompleto]);
      req.session.usuario = datos[0].Usu_NombreCompleto
      req.session.Documento = documento
      req.session.id = datos[0].ID_Usuario
      const usuario = { nombre: datos[0].Usu_NombreCompleto }
      //console.log("idUsuario: ",datos[0].ID_Usuario);
      
      
      res.locals.usuario = usuario
      res.locals.Documento = documento
      res.sendFile(path.join(__dirname, '../front/usuario.html'))
      await conect.end()
    }
    else {
      await conect.execute(`SELECT * FROM Usuario WHERE Usu_NumeroDocumento=? AND Usu_TipoDocumento=?`, [documento, tipodedocumento])
      res.status(201).send(`<script>
        window.onload = function(){
            alert("Usuario no existe")
            window.location.href = './registro.html'
        }
    </script>`)
    }
    await conect.end()
  }
  catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).send("Error en el servidor")
  }
})

app.post('/obtener-usuario', (req, res) => {
  const usuario = req.session.usuario
  if (usuario) {
    res.json({ Usu_NombreCompleto: usuario })
    console.log(usuario)
  }
  else {
    res.status(401).send('Usuario no autenticado')
  }
})


//obtener servicios
app.post('/obtener-servicios', async(req,res)=>{
  const usuario = req.session.usuario
  console.log('coockie: ',req.session);

  try{
    const conect = await mysql2.createConnection(db)
    const [datos] = await conect.execute('SELECT servicios.Ser_Nombre, servicios.ID_Servicios FROM servicios INNER JOIN servicios_manzanas ON servicios_manzanas.FK_ID_Servicios = servicios.ID_Servicios INNER JOIN manzanas ON     manzanas.ID_Manzanas = servicios_manzanas.FK_ID_Manzanas INNER JOIN usuario ON   manzanas.ID_Manzanas = usuario.FK_ID_Manzanas WHERE usuario.Usu_NombreCompleto =?', [usuario])
    console.log (datos)
    res.json(datos)
    await conect.end()
  }
  catch(error){
    console.error('Error en el servidor: ', error);
    res.status(500).send('Error en el servidor');
  }
})

app.post('/guardar-servicios', async (req, res) => {
  try {
    const usuario = req.session.usuario
    const documento = req.session.Documento
    const {servicios,fecha_hora} = req.body
    const conect = await mysql2.createConnection(db) 
    const [datos] = await conect.execute('SELECT * FROM usuario where Usu_NombreCompleto = ?', [usuario])
  
    servicios.forEach(async (idServicios) => {
      
      await conect.execute('INSERT INTO solicitudes (FK_ID_Usuario, Sol_Servicio, Sol_FechaHora) VALUES (?, ?, ?)', [datos[0].ID_Usuario, idServicios, fecha_hora])
      
    });
    

    res.json({
      idServicios: servicios,
      idUsuario: datos[0].ID_Usuario
    })
  } catch (error) {
    console.error('Error en el servidor: ', error);
    res.status(500).send('Error en el servidor');
  }
})

//Apertura del servidor
app.listen(3000, () => {
  console.log(`Servidor Node.js escuchando`);
})