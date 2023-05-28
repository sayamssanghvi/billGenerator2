class ProductBiz {

    constructor() {

    }

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let payload = {
                    productDescription: data.name,
                    productCode: data.hsnSacCode,
                    rate: data.rate,
                    gst: data.gst
                };

                await db.Products.create(payload);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}

module.exports = ProductBiz;