import fs from 'fs';
import ProductManager from './ProductManager.js';

class CarManager {

    constructor(fileName) {
        this.fileName = fileName;
        this.fullpath = `./src/db/${ fileName }`;
    }

    async save(car) {
        return new Promise((resolve, reject) => {
            try {
                const file = this._findFile() ? fs.readFileSync(this.fullpath, 'utf-8') : '[]';
                let object = JSON.parse(file || '[]');
                car.id = this._getMax(object);
                car.timestamp = this._getTimestamp();
                object.push(car);
                fs.writeFileSync(this.fullpath, JSON.stringify(object));
                resolve(car);
            } catch (error) {
                reject(error);
            }
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            try {
                const file = fs.readFileSync(this.fullpath, 'utf-8');
                const object = JSON.parse(file);
                const value = object.find(v => v.id === Number(id));
                resolve(value);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateById(car) {
        return new Promise((resolve, reject) => {
            try {
                let flagCar = false;
                const file = fs.readFileSync(this.fullpath, 'utf-8');
                const object = JSON.parse(file);
                const newArray = object.map(value => {
                    if( value?.id === car.id ) {
                        flagCar = true;
                        return car;
                    }
                    return value;
                });
                fs.writeFileSync(this.fullpath, JSON.stringify(newArray));
                flagCar ? resolve(car) : resolve({ error: 'No se ha encontrado carrito para modificar'});
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteById(id) {
        try {
            const file = fs.readFileSync(this.fullpath, 'utf-8');
            const object = JSON.parse(file);
            const isExist = object.find(value => value.id === id);
            if( isExist ) {
                const newArray = object.filter(value => value.id !== id);
                fs.writeFileSync(this.fullpath, JSON.stringify(newArray));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    deleteAll() {
        writeFileSync(this.fullpath, '[]');
    }

    getRandom() {
        return new Promise((resolve, reject) => {
            try {
                const file = fs.readFileSync(this.fullpath, 'utf-8');
                const object = JSON.parse(file);
                const random = Math.round(Math.random() * (object.length - 1));
                resolve(object[random]);
            } catch (error) {
                reject(error)
            }
        });
    }

    async addProduct(carId, carProduct) {
        try {
            if( !carId ) return({ error: 'No se ha ingresado id de carrito' });
            const productManager = new ProductManager('productos.json');
            if( !carProduct?.id ) return({ error: 'Formato de entrada invalido' });
            const product = await productManager.getById(carProduct?.id);
            if( !product ) return({ error: 'Producto ingreresado no encontrado' });
            const car = await this.getById(carId);
            if( !car ) return({ error: 'Carrito ingresado no encontrado' });
            car.products.push(product);
            const responseUpdate = await this.updateById(car);
            if( !!responseUpdate?.error ) {
                return(responseUpdate);
            } else {
                return({ message: `${ product.title} agregado con exito!` })
            }
        } catch (error) {
            return({ error: 'Error al agregar producto' });
        }
    }

    async deleteProduct(carId, productId) {
        try {
            if( !carId ) return({ error: 'No se ha ingresado id de carrito' });
            if( !productId ) return({ error: 'No se ha ingresado id de producto' });
            let flagDelete = false;
            let car = await this.getById(carId);
            if( !car ) return({ error: 'Carrito ingresado no encontrado' });
            const newArray = car.products.map(product => {
                if( product?.id === Number(productId) && !flagDelete ) {
                    flagDelete = true;
                } else {
                    return product;
                }
            });
            car.products = newArray.filter(array => array);
            const responseUpdate = await this.updateById(car);
            if( !!responseUpdate?.error ) {
                return(responseUpdate);
            } else {
                return({ message: 'Producto eliminado con exito!' })
            }
        } catch (error) {
            console.log(error);
            return({ error: 'Error al eliminar producto' });
        }
    }

    _findFile() {
        return fs.existsSync(this.fullpath);
    }

    _getMax(array) {
        let maxId = 0;
        array.map(({ id }) => (id > maxId && (maxId = id)));
        maxId++;
        return maxId;
    }

    _getTimestamp() {
        return Date.now().toLocaleString();
    }

}

export default CarManager;