import Twilio from 'twilio';

export const sendMessageWhatsapp = async (usuario, email) => {
    try {
        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_TOKEN;
        const client = new Twilio(accountSid, authToken)
        let message = `¡Confirmación de compra! El usuario ${ usuario } (${ email }) ha realizado una compra con exito!`;
        const options = {
            body: message,
            from: `whatsapp:${ process.env.TWILIO_NUMBER }`,
            to: `whatsapp:${ process.env.ADMIN_NUMBER }`
        }
        const { status } = await client.messages.create(options);
        return status;
    } catch (error) {
    }
}