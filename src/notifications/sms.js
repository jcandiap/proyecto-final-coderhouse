import Twilio from 'twilio';

export const sendMessageSms = async (telefono) => {
    try {
        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_TOKEN;
        const client = new Twilio(accountSid, authToken);
        let message = 'Su compra ha sido recibida y ha sido confirmada con exito!\nGracias por comprar en Ecommerce Coderhouse!'
        const options = {
            body: message,
            from: process.env.TWILIO_SMS_NUMBER,
            to: telefono
        }
        const { status } = await client.messages.create(options);
        return status;
    } catch (error) {
    }
}