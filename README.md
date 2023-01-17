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
Carro: Si bien el tiempo medio de respuesta del modo fork (2322.1) fue mas alto que el del modo cluster (2186.8), este pudo procesar mayor cantidad de solicitudes (14 de modo FORK vs 8 de modo CLUSTER).
Productos:  