# Tercera entrega
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
