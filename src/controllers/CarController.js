import { errorLogger } from "../config/logger.js";
import CarDAO from "../dao/CarDAO.js";
import { GettingCarDTO } from "../dto/CarDTO.js";

const carContainer = new CarDAO();

export async function getCarInfo(req, res) {
    try {
        const { userId, carId } = req.body;
        const car = await carContainer.getByUser(carId, userId);
        if( !car ) {
            res.status(400).send({ status: 'error', message: 'Car not found' });
            return;
        }
        res.status(200).send({ status: 'ok', message: 'Car obtained', data: new GettingCarDTO(car) });
    } catch (error) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function addProductToCar(req, res) {

}

export async function deleteProduct(req, res) {

}

export async function deleteSingleProduct(req, res) {

}

export async function passCarToOrder(req, res) {

}