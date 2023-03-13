export async function generateOrder(car, userId) {
    let order = {
        userId,
        orderDetail: car.products.map(product => product.total = product.price * product.amount)
    };
    
}