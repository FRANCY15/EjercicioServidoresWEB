const express = require('express');
const Service = require('./src/service')

// creamos una aplicación para ejecutar express
const app = express();

//Creamos una constante con el puerto en el que se va a ejecutar nuestro servidor de forma local
const PORT = 3000;

// Le damos la capacidad de recibir datos de tipo json desde el cliente
app.use(express.json())

//le damos la capacidad para que escuche las peticiones del seridor mediante los verbos http:

//get recibe 2 parametros: 1. string con la ruta, 2. función controladora => recibe 2 parametros : request: petición que se hace al servidor, response: respuesta que emite el servidor



app.get('/', (req, res) => {
    res.json({
        message: 'Lista de usuarios',
        body: Service.getUsers(),
    })
});

app.get('/:id', (req, res) => {
    let {params : {id}} = req;
    let user = Service.getUser(id)
    res.json({
        message: `Usuario ${id}`,
        body: user,
    })
})

//End points...
app.post('/', (req, res) => {
    let { body: newUser } = req;
    let user = Service.createUser(newUser);
    res.status(201).json({
        message: 'Usuario creado',
        body: user
    })
})

app.put('/:id', (req, res) => {
    let { params : {id} } = req;
    let { body: userUpdate } = req;
    res.status(201).json({
        message: 'Usuario actualizado',
        body: Service.updateUser(id, userUpdate)
    })
})

app.delete('/:id', (req,res) => {
    let {params : {id} } = req;
    res.status(201).json({
        message: `El usuario ${id}, ha sido eliminado`,
        body: Service.deleteUser(id) 
    })
})

// la app puede recibir peticiones, pero primero debemos levantar el servidor, y este debe estar escuchando cualquier petición:

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});



