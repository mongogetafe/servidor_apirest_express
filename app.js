const { json } = require('express');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const port = 3000;

let proveedores = [
    {_id: 1, nombre: 'Gas Natural, S.A.', cif: 'A12345678', domicilio: 'Bilbao'},
    {_id: 2, nombre: 'Iberdrola, S.A.', cif: 'A87654321', domicilio: 'Madrid'},
    {_id: 3, nombre: 'Planeta D\'Agostini', cif: 'A43218765', domicilio: 'Barcelona'}
]

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => { // Base path o ruta raiz
    res.status(200).json(proveedores);
})

// Get con queries-string en la url (ruta?clave1=valor1&clave2=valor2...)

app.get('/consulta', (req, res) => {
    console.log(req.query);
    res.status(200).json({ok: true});
})

// Get con parámetros en la url (ruta/parametro1/parametro2...)

app.get('/consulta_unica/:_id', (req, res) => {
    let proveedor = proveedores.find(elem => {
        return elem._id == req.params._id;
    })
    if (proveedor === undefined) {
        return res.status(404).json({
            error: 20001, // Ejemplo de posible código de error nuestro
            mensaje: 'No se encontró ningún proveedor'
        })
    }
    res.status(200).json(proveedor);
})

app.get('/prov*', (req, res) => {
    res.status(200).json({
        mensaje: 'Responde a los get de cualquier ruta que comience en prov'
    })
})

app.get('/*', (req, res) => {
    res.status(200).json({
        mensaje: 'Error en endpoint'
    })
})

// Post para crear registros

app.post('/', (req, res) => {
    let proveedor = req.body;
    proveedor._id = proveedores.length + 1;
    proveedores.push(proveedor);
    res.status(201).json({
        mensaje: `El provedor ${proveedor.nombre} ha sido registrado`
    })
    console.log(proveedores);
})

// Put para actualizar registros

app.put('/:_id', (req, res) => {
    let posicion = proveedores.findIndex(elem => {
        return elem._id == req.params._id;
    })
    if (posicion < 0) {
        return res.status(404).json({
            mensaje: 'El proveedor no existe'
        })
    }
    if(req.body.nombre !== undefined) {
        proveedores[posicion].nombre = req.body.nombre;
    }
    if(req.body.cif !== undefined) {
        proveedores[posicion].cif = req.body.cif;
    }
    if(req.body.domicilio !== undefined) {
        proveedores[posicion].domicilio = req.body.domicilio;
    }
    res.status(201).json({
        mensaje: `El provedor ${proveedores[posicion].nombre} ha sido actualizado`
    })
    console.log(proveedores);
})

// Delete para eliminar registros

app.delete('/:_id', (req, res) => {
    let posicion = proveedores.findIndex(elem => {
        return elem._id == req.params._id;
    })
    if (posicion < 0) {
        return res.status(404).json({
            mensaje: 'El proveedor no existe'
        })
    }
    res.status(200).json({
        mensaje: `El proveedor ha ${proveedores[posicion].nombre} sido eliminado`
    })
    proveedores.splice(posicion, 1);
    // delete proveedores[posicion]; // Opción guardando la posición
    // console.log(proveedores); // All credits to Carlos
    // console.log(proveedores[posicion]);
})



app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
})