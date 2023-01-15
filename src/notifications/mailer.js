import nodemailer from 'nodemailer';
import { readFileSync } from 'node:fs'

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'shirley.douglas@ethereal.email',
        pass: 'XCAuNyP6MJm1s7mnQ1'
    }
});

export const sendConfirmationEmail = async (email, products) => {
    try {
        const htmlFormat = readFileSync('./src/notifications/mailformat.html', 'utf-8');
        const mailerOptions = {
            from: 'Ecommerce Coderhouse',
            to: email,
            subject: 'Confirmación de compra',
            html: htmlFormat
        }
        const info = await transport.sendMail(mailerOptions);
    } catch (error) {
        throw new Error('Error al enviar confirmación por email'); 
    }
}

export const sendNewRegister = async (nombre, email) => {
    try {
        let htmlFormat = readFileSync('./src/notifications/newuser.html', 'utf-8');
        htmlFormat = htmlFormat.replace(/%USER_NAME%/g, nombre);
        htmlFormat = htmlFormat.replace(/%USER_EMAIL%/g, email);
        const mailerOptions = {
            from: 'Ecommerce Coderhouse',
            to: process.env.ADMIN_EMAIL,
            subject: 'Nuevo registro de usuario',
            html: htmlFormat
        }
        const info = await transport.sendMail(mailerOptions);
    } catch (error) {
        throw new Error('Error al enviar confirmación por email'); 
    }
}