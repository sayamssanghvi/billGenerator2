let electron = require('electron');

class BillBiz {

    constructor() {

    }

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                try {
                    let db = electron.remote.getGlobal('db');
                    console.log(db);
                    
                } catch (error) {
                    console.log("db consoling failed");
                    console.log(error);
                    reject(error);
                }
                let payload = {
                    placeOfSupply: data.placeOfSupply,
                    vendor: data.vendor.id,
                    billToAddress: data.billToAddress,
                    shipToAddress: data.shipToAddress,
                    products: JSON.parse(data.products),
                    poNo: data.poNo || null,
                    supplierCode: data.supplierCode || null,
                    terms: data.terms || null,
                    dueDate: data.dueDate,
                    gstInRupees: data.gstInRupees,
                    totalPrice: data.totalPrice
                };

                await db.Bills.create(payload);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}

module.exports = BillBiz;