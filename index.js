const express = require('express');
const app = express();
const request = require('request');
const async = require('async')
var nodemailer = require('nodemailer');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get('/upcoming/:dest/:msj', (request, response) => {

  
    let mensaje = request.params.msj;
    let destinatario = request.params.dest;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tuserviciodemail@gmail.com',
            pass: '8989MAilService$426%&&'
        }
    });

    var mailOptions = {
        from: 'tuserviciodemail@gmail.com',
        to: destinatario,
        subject: 'nueva consulta de un cliente',
        text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


    response.status(200).send({ 'rte': request.params.rte, 'dest': request.params.dest, 'msj': request.params.msj });
})



app.listen('3000', () => {
    console.log(`escuchando en puerto: 3000`);

})