import Twilio from 'twilio';

export const sendMessageWhatsapp = async (telefono, resumenCompra) => {
    try {
        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_TOKEN;
        const client = new Twilio(accountSid, authToken)
        let tablaResumen;
        let message = 'Tu compra ha sido confirmada con exito!\nA continuación te mostramos un resumen de tu compra:'
        if( resumenCompra.length > 0 ) {
            resumenCompra.map(resumen => {
                tablaResumen += `\n${ resumen.amount } ${ resumen.description }        $${ resumen.amount * resumen.price }`;
            });
        }
        message += tablaResumen;
        const options = {
            body: message,
            from: `whatsapp:${ process.env.TWILIO_NUMBER }`,
            to: `whatsapp:${ telefono }`
        }
        const { status } = await client.messages.create(options);
        return status;
    } catch (error) {
        console.error(error);
        throw new Error('Error al enviar mensaje');
    }
}