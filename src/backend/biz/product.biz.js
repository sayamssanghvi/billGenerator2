const { Op } = require("sequelize");

class ProductBiz {

    constructor() {

    }

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let payload = {
                    productDescription: data.name,
                    productCode: data.hsnSacCode,
                    rate: parseFloat(data.rate),
                    gst: parseFloat(data.gst)
                };

                await db.Products.create(payload);
                resolve();
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    searchByName(searchText) {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.Products.findAll({
                    where: {
                        productDescription: {
                            [Op.like]: `%${searchText}%`
                        }
                    },
                    raw:true
                });

                resolve(products);
            } catch (error) {
                reject(error);
            }
        });
    }

    searchByHSN(searchText) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("HSN Called");
                let products = await db.Products.findAll({
                    where: {
                        productCode: {
                            [Op.like]: `%${searchText}%`
                        }
                    },
                    raw: true
                });

                resolve(products);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = ProductBiz;