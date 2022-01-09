const express = require("express");
const path = require("path")
const app= express();
const nodemailer= require("nodemailer")
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
    res.sendFile("index.html")
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/home.html'))
})

app.get("/mailer",(req,res)=>{
   const mail= req.query.mail;
   console.log(mail);
   // async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
   
    
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service:"gmail",
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.mail, // generated ethereal user
        pass: process.env.pwd, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"testingnayana@gmail.com', // sender address
      to: mail, // list of receivers
      subject: "Mailer", // Subject line
      text: "Trying to send a mail to your account through mailer", // plain text body
      html: "<b>Trying to send a mail to your account through mailer</b>", // html body
    },function(err,info){
        if(err){
            res.sendFile(path.join(__dirname, 'public/failure.html'))
        }
        else{
            res.sendFile(path.join(__dirname, 'public/success.html'))
        }
    });    
  }  
  main().catch(console.error);
})


app.listen(process.env.PORT||5000,()=>console.log("server running"))