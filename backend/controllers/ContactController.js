const contactModel = require('../models/ContactModel');
const { mongooseToObject } = require('../util/mongoose');
const nodemailer = require('nodemailer');

class ContactController {
    // [POST] /store
    store(req, res, next) {
        const contact = new contactModel(req.body);
        contact
            .save()
            .then(() => res.send(contact))
            .catch(next);
    }

    // [GET] /
    show(req, res, next) {
        Promise.all([
            contactModel.find({}),
            contactModel.countDocumentsDeleted(),
        ])
            .then(([Contacts, deletedCount]) =>
                res.json({
                    deletedCount,
                    Contacts,
                })
            )
            .catch(next);
    }

    // [GET] /:id/edit
    showById(req, res, next) {
        contactModel
            .findOne({ _id: req.params.id })
            .then((contact) => {
                res.json(contact);
            })
            .catch(next);
    }

    // // [GET] /:slug
    // showBySlug(req, res, next) {
    //     contactModel.findOne({ slug: req.params.slug })
    //         .then(contact => {
    //             res.json(contact)
    //         })
    //         .catch(next)
    // }

    // [GET] /trash
    trash(req, res, next) {
        contactModel
            .findDeleted({})
            .then((contact) => res.json(contact))
            .catch(next);
    }

    // [PUT] /:id
    update(req, res, next) {
        contactModel
            .updateOne(
                { _id: req.params.id },
                {
                    name: req.body.name,
                    email: req.body.emai,
                    message: req.body.message,
                    reply: req.body.reply,
                    repliedAt: Date.now(),
                    status: true,
                }
            )
            .then((Contact) => res.send({ message: 'Update Successfully !!!' }))
            .catch(next);
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
        var content = '';
        content += `
            <div>
                <p>Chào ${req.body.name}</p>
                <p>Cám ơn bạn đã quan tâm đến Fashi shop của chúng tôi !</p>
                ${req.body.reply}
                <p style="font-size: 17px; margin-top: 20px;">Nếu có thắc mắc gì khác, bạn vui lòng cho Fashi shop biết tại
                    <a href="https://shopfashi.herokuapp.com/lien-he"><b>đây</b></a>. Chúng tôi rất hân hạnh được phục vụ bạn</p>
            </div>
    <p style="font-weight: 700; font-size: 20px; text-align: center;">Chúc Quý Khách có một ngày tốt lành</p>`;

        var mainOptions = {
            from: 'fashimanager@gmail.com',
            to: req.body.email,
            subject: 'PHẢN HỒI KHÁCH HÀNG',
            html: content,
        };
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.json({ err, message: 'Lỗi' });
            } else {
                res.json(info);
            }
        });
    }

    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        contactModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(next);
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        contactModel
            .deleteOne({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(next);
    }

    // [PATCH] /:id/restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                contactModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.json({ error: err });
        }
    }

    // [PATCH] /:id/active
    active = async (req, res, next) => {
        try {
            const contact = await contactModel.findOne({ _id: req.params.id });
            const seen = { status: true };
            contactModel
                .findOneAndUpdate({ _id: contact.id }, seen, {
                    returnOriginal: false,
                })
                .then(() => res.send('seen'))
                .catch(next);
        } catch (error) {
            res.send({ error: 'Error' });
        }
    };
}

module.exports = new ContactController();
