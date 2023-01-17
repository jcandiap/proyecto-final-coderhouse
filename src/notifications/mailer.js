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

export const sendConfirmationEmail = async (products, nombre, email) => {
    try {
        let htmlFormat = readFileSync('./src/notifications/mailformat.html', 'utf-8');
        htmlFormat = htmlFormat.replace(/%USER_NAME%/g, nombre);
        htmlFormat = htmlFormat.replace(/%USER_EMAIL%/g, email);
        if( Boolean(products) || products.length > 0 ) {
            let productsFormat = '';
            products.map(product => {
                productsFormat = `<tr>
                    <td>${ products.filter(p => product.id === p.id).length }</td>
                    <td>${ product.description }</td>
                    <td>$${ product.price }</td>
                <tr>`;
            }); 
            htmlFormat = htmlFormat.replace(/%PRODUCTS%/g, productsFormat);
        } else {
            htmlFormat = htmlFormat.replace(/%PRODUCTS%/g, '');
        }
        const mailerOptions = {
            from: 'Ecommerce Coderhouse',
            to: process.env.ADMIN_EMAIL,
            subject: `Nuevo pedido de ${ nombre } (${ email })`,
            html: htmlFormat
        }
        const info = await transport.sendMail(mailerOptions);
    } catch (error) {
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
    }
}