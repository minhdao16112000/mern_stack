const { JsonWebTokenError } = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const voucherModel = require('../models/VoucherModel');
const { generatePassword } = require('../util/ultil');

class VoucherController {
    /* ----BEGIN Actions Add Voucher ---- */
    // [POST] /
    store = async (req, res, next) => {
        const day = new Date();
        const oldVoucher = await voucherModel.find({
            idCharacter: req.body.idCharacter,
        });
        if (oldVoucher.length !== 0) {
            res.send({ message: 'Ký tự nhận biết đã tồn tại.' });
        } else if (req.body.expire < day.toLocaleDateString('en-CA')) {
            res.send({ message: 'Ngày hết hạn phải từ ngày hiện tại trở đi.' });
        } else {
            var length = 4 + (4 - req.body.idCharacter.length);
            const code = [];
            for (var i = 0; i < req.body.quantity; i++) {
                var shuffled =
                    'FS' +
                    req.body.idCharacter +
                    (await generatePassword(length));
                code.push(shuffled);
            }
            const newVoucher = new voucherModel({
                title: req.body.title,
                idCharacter: req.body.idCharacter,
                quantity: req.body.quantity,
                code: code,
                type: req.body.type,
                discount: req.body.discount,
                expire: req.body.expire,
                min: req.body.min,
            });
            newVoucher
                .save()
                .then((Voucher) => {
                    res.send({
                        voucher: Voucher,
                        message: 'New Order Created !!!',
                    });
                })
                .catch(next);
        }
    };
    /* ----END Actions Add Voucher ---- */

    /* ----BEGIN Actions Get Voucher ---- */
    // [GET] /
    show(req, res, next) {
        Promise.all([
            voucherModel.find({}, null, { sort: { createdAt: -1 } }),
            voucherModel.countDocumentsDeleted(),
        ])
            .then(([Vouchers, deletedCount]) =>
                res.json({
                    deletedCount,
                    Vouchers,
                })
            )
            .catch(next);
    }

    // [GET] /trash
    trash(req, res, next) {
        voucherModel
            .findDeleted({})
            .then((vouchers) => res.json(vouchers))
            .catch(next);
    }

    // [GET] /:code
    showByCode = async (req, res, next) => {
        var id = req.params.code.slice(2, 6);
        const day = new Date();
        var voucher = await voucherModel.findOne({
            idCharacter: id,
        });
        if (!voucher) {
            res.send({ message: 'Mã giảm giá không tồn tại' });
            return;
        }

        var getCode = voucher.code.filter((value) => value === req.params.code);
        if (getCode.length === 0) {
            res.send({
                message:
                    'Mã giảm giá của bạn đã được sử dụng hoặc không tồn tại',
            });
            return;
        }
        if (
            voucher.expire.toLocaleDateString('en-CA') <
            day.toLocaleDateString('en-CA')
        ) {
            res.send({
                message: 'Mã giảm giá của bạn đã hết hạn',
            });
            return;
        }
        res.send({
            message: 'Sử dụng mã giảm giá thành công',
            voucher: {
                id: voucher._id,
                code: req.params.code,
                type: voucher.type,
                discount: voucher.discount,
                min: voucher.min,
            },
        });
        // var getCode = voucher.code.filter(
        //     (value) => value === req.params.code
        // );
        // if(!getCode){
        //     res.send("Mã giảm giá của bạn đã được sử dụng ")
        // }
        // orderModel
        //     .findOne({ _id: req.params.id })
        //     .then((order) => {
        //         res.json(order);
        //     })
        //     .catch(() => res.send({ message: 'Order Not Found !!!' }));
    };
    /* ----END Actions Get Voucher ---- */

    /* ----Begin Actions Delete Voucher ---- */
    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        voucherModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(next);
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        voucherModel
            .deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(next);
    }
    /* ----End Actions Delete Voucher ---- */

    /* ----Begin Actions Restore Voucher ---- */
    // [PATCH] /restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                voucherModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.json({ error: error });
        }
    }
    /* ----End Actions Restore Voucher ---- */

    // // [POST] /store
    // sendEmail(req, res, next) {
    //     var transporter = nodemailer.createTransport({
    //         host: 'smtp.gmail.com',
    //         port: 465,
    //         secure: true,
    //         auth: {
    //             user: process.env.ACCOUNT_EMAIL,
    //             pass: process.env.PASSWORD_EMAIL,
    //         },
    //         tls: {
    //             // do not fail on invalid certs
    //             rejectUnauthorized: false,
    //         },
    //     });
    //     var qty = 0;
    //     req.body.order.orderItems.forEach((value) => {
    //         qty += value.quantity;
    //     });
    //     var total = new Intl.NumberFormat('vi-VN', {
    //         style: 'currency',
    //         currency: 'VND',
    //     }).format(req.body.order.totalPrice);
    //     ///Loop in table begin
    //     var items = '';
    //     req.body.order.orderItems.forEach((value, key) => {
    //         var a = `<tr style="height: 30px;">
    //             <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">Sản phẩm ${
    //                 key + 1
    //             }
    //             </td>
    //             <td style="width: 300px; text-align: center; border: 1px solid black;">${
    //                 value.name
    //             }</td>
    //         </tr>`;
    //         items += a;
    //     });
    //     ///Loop in table end
    //     var content = '';
    //     content += `
    //         <div>
    //             <p>Chào ${req.body.order.shippingAddress.lastName}</p>
    //             <p>Bạn đã đặt một đơn hàng mới từ cửa hàng <a href="http://localhost:3000/">Fashi</a> của chúng tôi !</p>
    //             <h3 style="text-align: center; font-weight: 700; font-size: 20px">Thông tin đơn hàng</h3>
    //             <div style="text-align: center;">
    //                 <table style="border: 1px solid black;">
    //                     <tr style="height: 30px;">
    //                         <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">Mã đơn hàng
    //                         </td>
    //                         <td style="width: 300px; text-align: center; border: 1px solid black;">${
    //                             req.body.order._id
    //                         }</td>
    //                     </tr>
    //                     <tr style="height: 30px;">
    //                         <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">Số lượng
    //                             sản phẩm</td>
    //                         <td style="width: 300px; text-align: center; border: 1px solid black;">${qty}</td>
    //                     </tr>
    //                     <tr style="height: 30px;">
    //                         <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">Tổng tiền
    //                         </td>
    //                         <td style="width: 300px; text-align: center; border: 1px solid black;">${total}</td>
    //                     </tr>
    //                     <tr style="height: 30px;">
    //                         <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">Phương thức
    //                             thanh toán</td>
    //                         <td style="width: 300px; text-align: center; border: 1px solid black;">${
    //                             req.body.order.paymentMethod
    //                         }</td>
    //                     </tr>
    //                     <tr style="height: 30px;">
    //                         <td style="padding-left: 15px; width: 200px; font-weight: 700; border: 1px solid black;">Tình trạng
    //                             thanh toán</td>
    //                         <td style="width: 300px; text-align: center; border: 1px solid black;">${
    //                             req.body.order.isPaid === true
    //                                 ? 'Đã thanh toán'
    //                                 : 'Chưa thanh toán'
    //                         }</td>
    //                     </tr>
    //                 </table>
    //             </div>
    //             <p style="font-size: 17px; margin-top: 20px;">Để biết thêm thông tin chi tiết và theo dõi trạng thái đơn hàng,
    //                 vui lòng nhấn vào
    //                 <a href="http://localhost:3000/order/${
    //                     req.body.order._id
    //                 }"><b>đây</b></a></p>
    //         </div>
    //         <h2 style="text-align: center; font-size: 20px; color: black; font-weight: 700">Cảm ơn Quý Khách đã tin tưởng và mua
    //     sắm tại Fashi
    //     Shop.</h2>
    // <p style="font-weight: 700; font-size: 20px; text-align: center;">Chúc Quý Khách có một ngày tốt lành</p>`;
    //     var mainOptions = {
    //         from: 'fashimanager@gmail.com',
    //         to: req.body.order.shippingAddress.emailAddress,
    //         subject: 'XÁC NHẬN ĐƠN HÀNG',
    //         html: content,
    //     };
    //     transporter.sendMail(mainOptions, function (err, info) {
    //         if (err) {
    //             res.json({ err, message: 'Lỗi' });
    //         } else {
    //             res.json(info);
    //         }
    //     });
    // }
    // // [GET] /:id/mine
    // showByMine = async (req, res, next) => {
    //     await orderModel
    //         .find({ user: req.params.id }, null, { sort: { createdAt: -1 } })
    //         .then((orders) => res.json(orders))
    //         .catch(next);
    // };

    // // [GET] /
    // show(req, res, next) {
    //     Promise.all([
    //         orderModel.find({}, null, { sort: { createdAt: -1 } }),
    //         orderModel.countDocumentsDeleted(),
    //     ])
    //         .then(([Orders, deletedCount]) =>
    //             res.json({
    //                 deletedCount,
    //                 Orders,
    //             })
    //         )
    //         .catch(next);
    // }
    // /* ----End Actions Show Voucher ---- */

    // /* ----Begin Actions Update Voucher ---- */
    // // [PATCH] /:id/status
    // status = async (req, res, next) => {
    //     try {
    //         const order = await orderModel.findOne({ _id: req.params.id });
    //         if (order) {
    //             order.status = req.body.saveStatus;
    //         }
    //         orderModel
    //             .findOneAndUpdate({ _id: order.id }, order, {
    //                 returnOriginal: false,
    //             })
    //             .then((Order) =>
    //                 res.send({ message: 'Order Paid', order: Order })
    //             )
    //             .catch(() => res.send({ message: 'Order Not Found !!!' }));
    //     } catch (error) {
    //         res.send({ error: 'Error' });
    //     }
    // };
    // // [PUT] /:id/delivered
    // delivered = async (req, res, next) => {
    //     try {
    //         const order = await orderModel.findOne({ _id: req.params.id });
    //         if (order) {
    //             order.delivered = req.body.saveDelivery;
    //             if (req.body.saveDelivery === 'Delivered') {
    //                 order.deliveredAt = Date.now();
    //             }
    //         }
    //         orderModel
    //             .findOneAndUpdate({ _id: order.id }, order, {
    //                 returnOriginal: false,
    //             })
    //             .then((Order) =>
    //                 res.send({ message: 'Order Paid', order: Order })
    //             )
    //             .catch(() => res.send({ message: 'Order Not Found !!!' }));
    //     } catch (error) {
    //         res.send({ error: 'Error' });
    //     }
    // };
    // // [PUT] /:id/pay
    // update = async (req, res, next) => {
    //     const order = await orderModel.findOne({ _id: req.params.id });
    //     if (order) {
    //         order.isPaid = true;
    //         order.paidAt = Date.now();
    //         order.paymentResult = {
    //             id: req.body.id,
    //             status: req.body.status,
    //             update_time: req.body.update_time,
    //             email: req.body.email,
    //         };
    //     }
    //     orderModel
    //         .findOneAndUpdate({ _id: order.id }, order, {
    //             returnOriginal: false,
    //         })
    //         .then((Order) => res.send({ message: 'Order Paid', order: Order }))
    //         .catch(() => res.send({ message: 'Order Not Found !!!' }));
    // };
    // /* ----End Actions Update Voucher ---- */

    // [POST] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             orderModel.delete({ _id: { $in: req.body.VoucherIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;
    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }
}

module.exports = new VoucherController();
