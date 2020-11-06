const express = require('express');

const app = express();
const port = 3000;

let proveedores = [
    {_id: 1, nombre: 'Gas Natural, S.A.', cif: 'A12345678', domicilio: 'Bilbao'},
    {_id: 2, nombre: 'Iberdrola, S.A.', cif: 'A87654321', domicilio: 'Madrid'},
    {_id: 3, nombre: 'Planeta D\'Agostini', cif: 'A43218765', domicilio: 'Barcelona'}
]

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

app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
})