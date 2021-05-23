
const nodemailer = require('nodemailer');
const database = require('./database');



class Mailer{

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "mail.examtimes.com.ng",
            port: 465,
            secure: true, // upgrade later with STARTTLS
            auth: {
              user: "testingnode@examtimes.com.ng",
              pass: "wayne3031"
            }
          });

    }


    verifyConn(){
        this.transporter.verify(function(error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
    }


   async sendMail(url, email){
        var message = {
           
            from: "testingnode@examtimes.com.ng",
            to: email,
            subject: "Node Mysql Forgot Password",
            text: "",
            html: "<h4>Forgot Password</h4><p>Link is valid for 20 seconds</p><a href='"+url+"'>Click here to reset password</a>"
          };

        let info = await this.transporter.sendMail(message);
        return info;
    }


   


}



mailer = new Mailer();
module.exports = mailer;



