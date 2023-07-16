const { Op } = require("sequelize");

class VendorBiz {

    constructor() {
    }

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {

                console.log(data);

                let payload = {
                    companyName: data.companyName,
                    billToDoorNo: data.billToDoorNo,
                    billToCityPincode: data.billToCityPincode,
                    shipToDoorNo: data.shipToDoorNo,
                    shipToCityPincode: data.shipToCityPincode,
                    gstin: data.gstin,
                    email: data.email
                };

                await db.Vendors.create(payload);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    searchByName(searchText) {
        return new Promise(async (resolve, reject) => {
            try {

                let vendors = await db.Vendors.findAll({
                    where: {
                        companyName: {
                            [Op.like]: `%${searchText}%`
                        }
                    },
                    raw: true
                });

                resolve(vendors);
            } catch (error) {
                reject(error);
            }
        });
    }

}

module.exports = VendorBiz;