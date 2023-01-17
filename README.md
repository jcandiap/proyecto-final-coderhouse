# Tercera entrega
[Click aca para ver la resolución](#resolucion)
#
## Author
- [@jcandiap](https://github.com/jcandiap)
#
- Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los ingresados al momento del registro.
    - El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.
    - La imagen se podrá subir al servidor y se guardara en una carpeta pública del mismo a la cual se tenga acceso por url.
- El formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones de forma exitosa, el usuario accederá a su home.
    - El usuario se logueara al sistema con email y password y trandrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.
    - Ante la incorporación de un usuario el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.
- Envío de un email un menaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.
    - El usuario iniciará la acción de pedido en la vista del *carrito*
    - Será enviado una vez finalizada la elección para realizar la compra de productos.
    - El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de Whatsapp se debe enviar la misma información del asunto del email.
    - El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.
## Aspectos a incluir:
- El servidor trabajará con una base de datos DBaaS (Ej: MongoDB o Atlas) y estará preparado para trabajar de forma local o en la nube a través de la plataforma PaaS Heroku (F⚰).
- Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacie la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
- Realizar una prueba de performance en modo local, con y sin cluster, utilizando [Artillery](https://www.npmjs.com/package/artillery) en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.

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
- Tambien se realizaron pruebas de performance con [Artillery](https://www.npmjs.com/package/artillery) donde se realiza el siguiente analisis:

# Pruebas realizadas con Artillery
## Productos
```bash
artillery quick --count 50 -n 40 http://localhost:8080/api/productos/ > products_cluster.txt
```
```bash
artillery quick --count 50 -n 40 http://localhost:8080/api/productos/ > products_fork.txt
```
## Carritos
```bash
artillery quick --count 50 -n 40 http://localhost:8080/api/carrito/ > car_cluster.txt
```
```bash
artillery quick --count 50 -n 40 http://localhost:8080/api/carrito/ > car_fork.txt
```
## Resultados pruebas con Artillery
Dentro de las pruebas se pudieron ver muchos codigos de error debido a la cantidad de solicitudes que se realizarón directamente a la base de datos MongoDB donde en la consola de esta se ve que llega al uso maximo de consultas:
###
![](https://i.imgur.com/5FJl9Oz.jpg)
#
Carro: El tiempo de respuesta medio del [modo fork](https://github.com/jcandiap/proyecto-final-coderhouse/blob/main/car_fork.txt) fue menor que el del [modo cluster](https://github.com/jcandiap/proyecto-final-coderhouse/blob/main/car_cluster.txt) donde por otro lado el modo cluster pudo procesar exitosamente mayor cantidad de solicitudes en comparación al modo cluster (219 vs 215)
##
Productos: El [modo cluster](https://github.com/jcandiap/proyecto-final-coderhouse/blob/main/products_cluster.txt) pudo procesar mas solicitudes de forma exitosa a diferencia de el [modo fork](https://github.com/jcandiap/proyecto-final-coderhouse/blob/main/products_fork.txt) y el tiempo de respuesta medio tambien fue mas bajo (2725 vs 2836.2)
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jcandiap/)