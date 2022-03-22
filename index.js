const express = require('express')
const port = 3010
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zakrevskaya.natalia.97@gmail.com', // generated ethereal user
        pass: 'zak30051997', // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/sendMessage', async function (req, res) {

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
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})