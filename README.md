# Tercera entrega
[Click aca para ver la resolución](#resolucion)
## Author
- [@jcandiap](https://github.com/jcandiap)
# Scripts
```bash
node src/app.js --modo=CLUSTER
```
```bash
node src/app.js --modo=FORK
```
Tambien se puede ejecutar por defecto utilizando el comando:
```bash
npm run start
```
# Alcances del proyecto
- Existencia de metodos para trabajar con el registro y login del usuario almacenando información importante que permita trabajar de forma correcta, adicionalmente se agrega JWT para manejar tokens que permiten la ejecución de otros servicios dentro de la aplicación.
- Se desarrolla un mantenedor de productos para el ecommerce donde existen metodos publicos como visualizacion de producto en especifico, productos en general y productos por categoria a los cuales cualquiera puede acceder, por otra parte, se implementaron metodos privados que utilizan el token generado una vez el usuario se encuentre logueado o este se haya registrado con exito.
- Los metodos del carrito funcionan exclusivamente con usuarios logeados que permite agregar productos al carrito, listar los productos que este tiene y eliminar de forma total el producto en el carrito o de forma unitaria.
- De igual forma que el punto anterior, generar una orden requiere que el usuario se encuentre logueado, permitiendo que se pueda concretar una orden asignandole un id de pago a esta lo cual enviara un correo al administrador especificando los productos en la compra.
## Aspectos a incluir:
- El proyecto es **sólo backend** y no se ha aplicado ningún metodo a una aplicación web.
- El servidor trabajará con una base de datos DBaaS (en este caso MongoDB) y estará preparado para trabajar de forma local o en la nube a través de la plataforma PaaS Heroku (F⚰).
- Habilitar el modo cluster para el servidor, como opcional a través de argumentos.
Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacie la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.

<a name="resolucion"></a>

# Resolución del desafio
- Para este desafio se utilizó para el almacenamiento de la base de datos [MongoDB](https://www.mongodb.com/)
- De acuerdo con lo explicado por el profesor durante la clase, para este desafio no era necesario el desarrollo de la interfaz grafica, solo manejo de los metodos por [Postman](https://api.postman.com/collections/6252878-bf1c0e51-0550-4298-8e59-853e5cfd4bda?access_key=PMAT-01GQ0B9YZW5JDPS0DTZPGDVEKT) 👨‍🚀
- Un usuario solo se puede registrar una vez con el mismo correo electronico.
- La contraseña ingresada por el usuario queda almacenada en la base de datos MongoDB utilizando la libreria [Bcrypt](https://www.npmjs.com/package/bcrypt), de igual forma la validación del login se realiza con la misma libreria.
- Se utiliza la libreria [Nodemailer](https://www.npmjs.com/package/nodemailer) para el envio de correo electronico al administrador una vez se registra un usuario y cuando se realiza una compra de forma exitosa.
- Se modificaron los metodos del *carrito* para que este solamente se pueda crear a usuarios registrados (sólo para validar por el momento).
- De igual forma para confirmar la compra se debe ingresar el id del *carrito* y el id del *usuario*.
- Se utiliza la libreria [Log4js](https://www.npmjs.com/package/log4js) para el manejo de información en la consola de la aplicación guardando los los [errores](https://github.com/jcandiap/proyecto-final-coderhouse/blob/main/error.log) y [advertencias](https://github.com/jcandiap/proyecto-final-coderhouse/blob/main/warn.log) en distintos archivos.
- Se utiliza [Twilio](https://www.npmjs.com/package/twilio) para el envio de mensajes de texto al usuario una vez este haya realizado una compra de forma exitosa y un mensaje de Whatsapp al administrador informando el nombre del usuario y correo electronico con el que realizaron la compra.
- Adicionalmente se agrego la libreria [Yargs](https://www.npmjs.com/package/yargs) 🏴‍☠️ para que se pueda ingresar el modo en el que se quiera ejecutar la aplicación, sea CLUSTER o FORK:
```bash
node src/app.js --modo=CLUSTER
```
```bash
node src/app.js --modo=FORK
```
Tambien se puede ejecutar por defecto utilizando el comando:
```bash
npm run start
```

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jcandiap/)