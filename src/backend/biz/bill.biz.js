let electron = require('electron');
let fs = require('fs');
let mailer = require('nodemailer');
let _ = require('lodash');

class BillBiz {

    constructor() {

    }

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                let payload = {
                    placeOfSupply: data.placeOfSupply,
                    vendor: data.vendor.id,
                    billToAddress: data.vendor.billToDoorNo + ',' + data.vendor.billToCityPincode,
                    shipToAddress: data.vendor.shipToDoorNo + ',' + data.vendor.shipToCityPincode,
                    products: JSON.parse(JSON.stringify(data.products)),
                    poNo: data.poNo,
                    supplierCode: data.supplierCode,
                    terms: data.terms,
                    dueDate: data.dueDate,
                    totalGstAmount: data.totalGstAmount,
                    totalAmount: data.totalAmount,
                    grandTotal: data.grandTotal,
                    isIGST: data.isIGST,
                    meta: JSON.parse(JSON.stringify(data))
                };

                let { _previousDataValues: { id: billNo } } = await db.Bills.create(payload);
                console.log(billNo);
                resolve(billNo);
            } catch (error) {
                reject(error);
            }
        });
    }

    update(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                let payload = {
                    placeOfSupply: data.placeOfSupply,
                    vendor: data.vendor.id,
                    billToAddress: data.vendor.billToDoorNo + ',' + data.vendor.billToCityPincode,
                    shipToAddress: data.vendor.shipToDoorNo + ',' + data.vendor.shipToCityPincode,
                    products: JSON.parse(JSON.stringify(data.products)),
                    poNo: data.poNo,
                    supplierCode: data.supplierCode,
                    terms: data.terms,
                    dueDate: data.dueDate,
                    totalGstAmount: data.totalGstAmount,
                    totalAmount: data.totalAmount,
                    grandTotal: data.grandTotal,
                    isIGST: data.isIGST,
                    version: data.version,
                    meta: JSON.parse(JSON.stringify(data))
                };

                await db.Bills.update(payload, {
                    where: {
                        id: data.billNo
                    },
                    raw: true
                });
                console.log(data.billNo);
                resolve(data.billNo);
            } catch (error) {
                reject(error);
            }
        });
    }

    search(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let bill = await db.Bills.findOne({
                    where: {
                        id: data.billNo
                    },
                    raw: true
                });

                resolve(bill);
            } catch (error) {
                reject(error);
            }
        });
    }

    savePDF(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data.version);
                // let basePath = 'D:\\personal\\Bill Generator\\SampleBillsByApp\\';
                let basePath = 'C:\\Users\\LENOVA\\Desktop\\SADA INTERNATIONAL EXPORTS\\Bills\\';
                let billNoForSave = data.billNo.slice(10, data.billNo.length);

                if (!fs.existsSync(basePath + data.vendor.companyName)) {
                    fs.mkdirSync(basePath + data.vendor.companyName);
                    fs.mkdirSync(basePath + data.vendor.companyName + "\\" + billNoForSave);
                } else if (data.version == 1) {
                    fs.mkdirSync(basePath + data.vendor.companyName + "\\" + billNoForSave);
                }

                let fullPath;

                if (data.version >= 2) {
                    fullPath = basePath + data.vendor.companyName + "\\" + billNoForSave + "\\" + data.billNo + "_" + data.version + '.pdf';
                } else {
                    fullPath = basePath + data.vendor.companyName + "\\" + billNoForSave + "\\" + data.billNo + '.pdf';
                }

                fs.writeFileSync(fullPath, Buffer.from(data.pdfBuffer));
                let result = {};

                if (!_.isEmpty(data.vendor.email) && data.type == "send") {
                    result = await this.sendMail({ ...data, fullPath });
                }
                _.set(result, "savePDF", true);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    sendMail(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // let mailTransport = mailer.createTransport({
                //     service: 'gmail',
                //     host: "smtp.gmail.com",
                //     port: 587,
                //     secure: false,
                //     auth: {
                //         user: "s3sanghvi@gmail.com",
                //         pass: "syvylcjlgyyxaczt"
                //     }
                // });

                let mailTransport = mailer.createTransport({
                    service: 'gmail',
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "sadainternationalexports@gmail.com",
                        pass: "jecyqgixvcvtokoz"
                    }
                });

                let mailDetails = {
                    from: "sadainternationalexports@gmail.com",
                    to: data.vendor.email,
                    subject: "Invoice",
                    attachments: [{
                        fileName: data.billNo,
                        path: data.fullPath
                    }]
                };

                mailTransport.sendMail(mailDetails, (error, data) => {
                    if (error) {
                        console.log(error);
                        console.log("Email not sent");
                        return reject({ mailSent: false });
                    } else {
                        console.log(data);
                        console.log("Email sent successfully");
                        return resolve({ mailSent: true });
                    }
                })
            } catch (error) {
                reject({ error, success: false });
            }
        });
    }
}

module.exports = BillBiz;