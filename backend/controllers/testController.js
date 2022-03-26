const { JsonWebTokenError } = require('jsonwebtoken');
const orderModel = require('../models/OrderModel');
const nodemailer = require('nodemailer');

class testController {

    // [POST] /store
    sendMail(req, res, next) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'bluroller161@gmail.com',
                pass: 'minh16112000'
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });
        var a = "minh"
        var content = '';
        content +=
            `<p>Chào ${a}</p>
            <p>Bạn đã đặt một đơn hàng mới từ cửa hàng <a href="http://localhost:3000/">Fashi</a> của chúng tôi !</p>
            <h3 style="font-weight: 700; font-size: 20px">Thông tin đơn hàng</h3>
            <table style = "width:100%; border:1px solid black" >
                <tr style="border:1px solid black">
                    <th style="border:1px solid black">Company</th>
                    <th style="border:1px solid black">Contact</th>
                    <th style="border:1px solid black">Country</th>
                </tr>
                <tr style="border:1px solid black">
                    <td style="border:1px solid black">Alfreds Futterkiste</td>
                    <td style="border:1px solid black">Maria Anders</td>
                    <td style="border:1px solid black">Germany</td>
                </tr>
                <tr style="border:1px solid black">
                    <td style="border:1px solid black">Centro comercial Moctezuma</td>
                    <td style="border:1px solid black">Francisco Chang</td>
                    <td style="border:1px solid black">Mexico</td>
                </tr>
            </table >`;
        var mainOptions = {
            from: 'fashimanager@gmail.com',
            to: "minhdao.161120@gmail.com",
            subject: 'XÁC NHẬN ĐƠN HÀNG',
            html: content,

        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.json({ err, message: "Lỗi" });
            } else {
                res.json(info);
            }
        });

    }
}

module.exports = new testController();