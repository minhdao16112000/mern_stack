const { JsonWebTokenError } = require('jsonwebtoken');
const orderModel = require('../models/OrderModel');
const voucherModel = require('../models/VoucherModel');
const nodemailer = require('nodemailer');

class OrderController {
    /* ----Begin Actions Add product ---- */
    // [POST] /store
    store = async (req, res, next) => {
        if (req.body.orderItems.length === 0) {
            res.send({ message: 'Cart is empty' });
        } else {
            if (req.body.voucher.length !== 0) {
                var idCharacter = req.body.voucher?.slice(2, 6);
                var voucher = await voucherModel.findOne({
                    idCharacter: idCharacter,
                });
                var option = {};
                if (voucher.used && voucher.used.length !== 0) {
                    option.used = voucher.used;
                } else {
                    option.used = [];
                }
                option.used.push(req.body.voucher);
                option.code = voucher.code.filter(
                    (value) => value !== req.body.voucher
                );
                console.log(voucher);
                await voucherModel.findOneAndUpdate(
                    { _id: voucher._id },
                    option
                );
            }

            const order = new orderModel({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                shippingFee: req.body.shippingFee,
                totalPrice: req.body.totalPrice,
                paymentMethod: req.body.paymentMethod,
                user: req.body.user,
                voucher: req.body.voucher,
                discount: req.body.discount,
            });
            order
                .save()
                .then(() =>
                    res.json({
                        order,
                        message: {
                            message: 'New Order Created !!!',
                        },
                    })
                )
                .catch(next);
        }
    };

    // [POST] /store
    sendEmail(req, res, next) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ACCOUNT_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
        });
        var qty = 0;
        req.body.order.orderItems.forEach((value) => {
            qty += value.quantity;
        });
        var total = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(req.body.order.totalPrice);
        ///Loop in table begin
        var items = '';
        req.body.order.orderItems.forEach((value, key) => {
            var a = `<tr style="height: 30px;">
                <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">S???n ph???m ${
                    key + 1
                }
                </td>
                <td style="width: 300px; text-align: center; border: 1px solid black;">${
                    value.name
                }</td>
            </tr>`;
            items += a;
        });
        ///Loop in table end
        var content = '';
        content += `
            <div>
                <p>Ch??o ${req.body.order.shippingAddress.lastName}</p>
                <p>B???n ???? ?????t m???t ????n h??ng m???i t??? c???a h??ng <a href="http://localhost:3000/">Fashi</a> c???a ch??ng t??i !</p>
                <h3 style="text-align: center; font-weight: 700; font-size: 20px">Th??ng tin ????n h??ng</h3>
                <div style="text-align: center;">
                    <table style="border: 1px solid black;">
                        <tr style="height: 30px;">
                            <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">M?? ????n h??ng
                            </td>
                            <td style="width: 300px; text-align: center; border: 1px solid black;">${
                                req.body.order._id
                            }</td>
                        </tr>
                        <tr style="height: 30px;">
                            <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">S??? l?????ng
                                s???n ph???m</td>
                            <td style="width: 300px; text-align: center; border: 1px solid black;">${qty}</td>
                        </tr>
                        <tr style="height: 30px;">
                            <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">T???ng ti???n
                            </td>
                            <td style="width: 300px; text-align: center; border: 1px solid black;">${total}</td>
                        </tr>
                        <tr style="height: 30px;">
                            <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">Ph????ng th???c
                                thanh to??n</td>
                            <td style="width: 300px; text-align: center; border: 1px solid black;">${
                                req.body.order.paymentMethod
                            }</td>
                        </tr>
                        <tr style="height: 30px;">
                            <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">T??nh tr???ng
                                thanh to??n</td>
                            <td style="width: 300px; text-align: center; border: 1px solid black;">${
                                req.body.order.isPaid === true
                                    ? '???? thanh to??n'
                                    : 'Ch??a thanh to??n'
                            }</td>
                        </tr>
                    </table>
                </div>
                <p style="font-size: 17px; margin-top: 20px;">????? bi???t th??m th??ng tin chi ti???t v?? theo d??i tr???ng th??i ????n h??ng,
                    vui l??ng nh???n v??o
                    <a href="http://localhost:3000/order/${
                        req.body.order._id
                    }"><b>????y</b></a></p>
            </div>
            <h2 style="text-align: center; font-size: 20px; color: black; font-weight: 700">C???m ??n Qu?? Kh??ch ???? tin t?????ng v?? mua
        s???m t???i Fashi
        Shop.</h2>
    <p style="font-weight: 700; font-size: 20px; text-align: center;">Ch??c Qu?? Kh??ch c?? m???t ng??y t???t l??nh</p>`;

        var mainOptions = {
            from: 'fashimanager@gmail.com',
            to: req.body.order.shippingAddress.emailAddress,
            subject: 'X??C NH???N ????N H??NG',
            html: content,
        };
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.json({ err, message: 'L???i' });
            } else {
                res.json(info);
            }
        });
    }

    // [GET] /:id/mine
    showByMine = async (req, res, next) => {
        await orderModel
            .find({ user: req.params.id }, null, { sort: { createdAt: -1 } })
            .then((orders) => res.json(orders))
            .catch(next);
    };

    // [GET] /:id
    showById(req, res, next) {
        orderModel
            .findOne({ _id: req.params.id })
            .then((order) => {
                res.json(order);
            })
            .catch(() => res.send({ message: 'Order Not Found !!!' }));
    }

    // [GET] /
    show(req, res, next) {
        Promise.all([
            orderModel.find({}, null, { sort: { createdAt: -1 } }),
            orderModel.countDocumentsDeleted(),
        ])
            .then(([Orders, deletedCount]) =>
                res.json({
                    deletedCount,
                    Orders,
                })
            )
            .catch(next);
    }
    /* ----End Actions Show product ---- */

    // [GET] /trash
    trash(req, res, next) {
        orderModel
            .findDeleted({})
            .then((orders) => res.json(orders))
            .catch(next);
    }

    /* ----Begin Actions Update product ---- */
    // [PATCH] /:id/status
    status = async (req, res, next) => {
        try {
            const order = await orderModel.findOne({ _id: req.params.id });
            if (order) {
                order.status = req.body.saveStatus;
            }

            orderModel
                .findOneAndUpdate({ _id: order.id }, order, {
                    returnOriginal: false,
                })
                .then((Order) =>
                    res.send({
                        message: 'Change Status Order Successfully !!!',
                        order: Order,
                    })
                )
                .catch(() => res.send({ message: 'Order Not Found !!!' }));
        } catch (error) {
            res.send({ error: 'Error' });
        }
    };

    // [PUT] /:id/delivered
    delivered = async (req, res, next) => {
        try {
            const order = await orderModel.findOne({ _id: req.params.id });
            if (order) {
                order.delivered = req.body.saveDelivery;
                if (req.body.saveDelivery === 'Delivered') {
                    order.deliveredAt = Date.now();
                    if (
                        order.paymentMethod === 'Ti???n M???t' &&
                        order.isPaid === false
                    ) {
                        order.isPaid = true;
                        order.paidAt = Date.now();
                    }
                }
            }
            orderModel
                .findOneAndUpdate({ _id: order.id }, order, {
                    returnOriginal: false,
                })
                .then((Order) =>
                    res.send({ message: 'Order Paid', order: Order })
                )
                .catch(() => res.send({ message: 'Order Not Found !!!' }));
        } catch (error) {
            res.send({ error: 'Error' });
        }
    };

    // [PUT] /:id/pay
    update = async (req, res, next) => {
        const order = await orderModel.findOne({ _id: req.params.id });
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email: req.body.email,
            };
        }
        orderModel
            .findOneAndUpdate({ _id: order.id }, order, {
                returnOriginal: false,
            })
            .then((Order) => res.send({ message: 'Order Paid', order: Order }))
            .catch(() => res.send({ message: 'Order Not Found !!!' }));
    };
    /* ----End Actions Update product ---- */

    /* ----Begin Actions Delete product ---- */
    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        orderModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(next);
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        orderModel
            .deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(next);
    }
    /* ----End Actions Delete product ---- */

    /* ----Begin Actions Restore product ---- */
    // [PATCH] /restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                orderModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.json({ error: err });
        }
    }
    /* ----End Actions Restore product ---- */

    // [POST] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             orderModel.delete({ _id: { $in: req.body.productIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('???? x??a c??c s???n ph???m ???? ch???n !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }
}

module.exports = new OrderController();
