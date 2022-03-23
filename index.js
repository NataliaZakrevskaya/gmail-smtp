const express = require('express');
const port = process.env.PORT || 3010;
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ["Content-Type"]
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// let smtp_login = process.env.SMTP_LOGIN || 'zakrevskaya.natalia.97@gmail.com'
// let smtp_password = process.env.SMTP_PASSWORD || 'zak30051997'

let smtp_login = 'zakrevskaya.natalia.97@gmail.com'
let smtp_password = 'zak30051997'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: smtp_login /*'zakrevskaya.natalia.97@gmail.com'*/, // generated ethereal user
        pass: smtp_password/*'zak30051997'*/, // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/sendMessage', async function (req, res) {
    try {
        let {name, email, phone, message} = req.body;
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'My profile page', // sender address
            to: 'zakrevskaya.natalia.97@gmail.com', // list of receivers
            subject: 'testing gmail', // Subject line
            // text: 'text for testing', // plain text body
            html: `<b>Message from your portfolio</b> 
<div>name: ${name}</div>
<div>email: ${email}</div>
<div>phone: ${phone}</div>
<div>message: ${message}</div>`, // html body
        });
        res.send('ok!')
    } catch (e) {
        console.log('e', e)
        res.send(e)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})