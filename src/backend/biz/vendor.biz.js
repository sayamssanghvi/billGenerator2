class VendorBiz {

    constructor() {
    }

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let payload = {
                    companyName: data.companyName,
                    billToDoorNo: data.billToDoorNo,
                    billToCityPincode: data.billToCityPincode,
                    shipToDoorNo: data.shipToDoorNo,
                    shipToCityPincode: data.shipToCityPincode,
                    gstin: data.gstin,
                    email: data.email
                };

                console.log(db);

                await db.Vendors.create(payload);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}

module.exports = VendorBiz;