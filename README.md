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
