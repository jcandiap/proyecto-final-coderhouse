import { promises as fs } from 'fs';
class ContenedorArchivos {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(newRegister) {
        try {
            const file = await this._findFile() ? await fs.readFile(this.ruta, 'utf-8') : '[]';
            let object = JSON.parse(file || '[]');
            newRegister.id = this._getMax(object);
            newRegister.timestamp = this._getTimestamp();
            object.push(newRegister);
            await fs.writeFile(this.ruta, JSON.stringify(object));
            return newRegister;
        } catch (error) {
            throw new Error('Error al guardar el registro');
        }
    }

    async getById(id) {
        try {
            const file = await fs.readFile(this.ruta, 'utf-8');
            const object = JSON.parse(file);
            const value = object.find(v => v.id === Number(id));
            return value
        } catch (error) {
            throw new Error(`Error al obtener id ${ id }`);
        }
    }

    async getAll() {
        try {
            const file = await fs.readFile(this.ruta, 'utf-8');
            const object = JSON.parse(file);
            return object
        } catch (error) {
            throw new Error(`Error al obtener los registros`);
        }
    }

    async updateById(registerUpdate) {
        try {
            let flagCar = false;
            const file = await fs.readFile(this.ruta, 'utf-8');
            const object = JSON.parse(file);
            const newArray = object.map(value => {
                if( value?.id === registerUpdate.id ) {
                    flagCar = true;
                    return registerUpdate;
                }
                return value;
            });
            await fs.writeFile(this.ruta, JSON.stringify(newArray));
            if( flagCar ) {
                return(registerUpdate);
            } else {
                return({ error: 'No se ha encontrado carrito para modificar'});
            }
        } catch (error) {
            throw new Error('Error al modificar registro');
        }
    }

    async deleteById(registerDelete) {
        try {
            const file = await fs.readFile(this.ruta, 'utf-8');
            const object = JSON.parse(file);
            const isExist = object.find(value => value.id === registerDelete);
            if( isExist ) {
                const newArray = object.filter(value => value.id !== registerDelete);
                await fs.writeFile(this.ruta, JSON.stringify(newArray));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    async deleteAll() {
        await fs.writeFile(this.ruta, '[]');
    }

    async getRandom() {
        try {
            const file = await fs.readFile(this.ruta, 'utf-8');
            const object = JSON.parse(file);
            const random = Math.round(Math.random() * (object.length - 1));
            return object[random];
        } catch (error) {
            throw new Error('Error al obtener registro aleatorio');
        }
    }

    async _findFile() {
        return await fs.exists(this.ruta);
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

export default ContenedorArchivos;