/* eslint-disable prettier/prettier */
'use strict';
const nodemailer = require('nodemailer');

class Mailer {
    constructor(auth, host = 'smtp.gmail.com', port = 465, secure = true) {
        let transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth
        });
    }

    /**
     * Send email
     * @param {object} data
     * @property {from} data.from       - From who the mail sent.
     * @property {to} data.to           - To whom the mail sent.
     * @property {subject} data.subject - Mail subject.
     * @property {text} data.text       - Mail body text.
     * @property {html} data.html       - Mail body html text.
     */
    send({ from, to, subject, text, html }) {
        return transporter.sendMail({
            from,
            to,
            subject,
            text,
            html
        });
    }
}

module.exports = Mailer;
