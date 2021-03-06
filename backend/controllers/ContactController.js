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
                    email: req.body.email,
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
                <p>Ch??o ${req.body.name}</p>
                <p>C??m ??n b???n ???? quan t??m ?????n Fashi shop c???a ch??ng t??i !</p>
                ${req.body.reply}
                <p style="font-size: 17px; margin-top: 20px;">N???u c?? th???c m???c g?? kh??c, b???n vui l??ng cho Fashi shop bi???t t???i
                    <a href="http://localhost:3000/contact"><b>????y</b></a>. Ch??ng t??i r???t h??n h???nh ???????c ph???c v??? b???n</p>
            </div>
    <p style="font-weight: 700; font-size: 20px; text-align: center;">Ch??c Qu?? Kh??ch c?? m???t ng??y t???t l??nh</p>`;

        var mainOptions = {
            from: 'fashimanager@gmail.com',
            to: req.body.email,
            subject: 'PH???N H???I KH??CH H??NG',
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

    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        contactModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(() => res.send({ message: 'Delete failed' }));
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        contactModel
            .deleteOne({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(() => res.send({ message: 'Delete Forever failed' }));
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
            res.send({ message: err });
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
            res.send({ message: 'Error' });
        }
    };
}

module.exports = new ContactController();
