const userModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

class UserController {
    // [POST] /login
    login = async (req, res, next) => {
        try {
            const user = await userModel.findOne({ email: req.body.email });
            if (user) {
                if (bcryptjs.compareSync(req.body.password, user.password)) {
                    res.send({
                        info: {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: user.phone,
                            sex: user.sex,
                            role: user.role,
                            address: user.address,
                            favorites: user.favorites,
                        },
                        message: {
                            message: 'Đăng nhập thành công !',
                        },
                    });
                    return;
                }
                res.send({ message: 'Email hoặc mật khẩu không chính xác !' });
            } else {
                res.send({ message: 'User không tồn tại !' });
            }
        } catch (next) {
            res.send({ error: 'Error' });
        }
    };

    // [POST] /register
    register = async (req, res, err) => {
        const newUser = new userModel({
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 8),
        });

        await newUser
            .save()
            .then(() =>
                res.send({
                    info: {
                        _id: newUser._id,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        phone: newUser.phone,
                        role: newUser.role,
                        sex: newUser.sex,
                        address: newUser.address,
                    },
                    message: {
                        message: 'Đăng ký thành công !',
                    },
                })
            )
            .catch((err) => res.status(500).json({ error: err.message }));
    };

    //[POST] /forgetPassword
    forgetPassword = async (req, res, err) => {
        const user = await userModel.findOne({ email: req.body.email });
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
        if (user) {
            console.log(user._id.toString());
        }
        var content = '';
        content += `
            <div>
                <p>Chào </p>
                <p>Có một yêu cầu thay đổi mật khẩu từ bạn.</p>
                <p>Nếu không phải bạn thực hiện yêu cầu thì bỏ qua tin nhắn này.</p>
                <p>Bạn hãy nhấn vào <a href="http://localhost:3000/change-password/${user._id}"><b>Link này</b></a>
                 để thay đổi mật khẩu.</p>
                <p><i>(Thời hạn của đường dẫn trên là 72 giờ.)</i></p>`;

        var mainOptions = {
            from: 'fashimanager@gmail.com',
            to: req.body.email,
            subject: 'FASHI THÔNG BÁO',
            html: content,
        };
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.json({ err, message: 'Lỗi' });
            } else {
                res.json(user);
            }
        });
    };

    //[PUT] /changePassword
    changePassword = async (req, res, err) => {
        const user = await userModel.findOne({ _id: req.body.id });
        if (user) {
            user.password = bcryptjs.hashSync(req.body.password, 8);
        }
        userModel
            .findOneAndUpdate({ _id: req.body.id }, user, {
                returnOriginal: false,
            })
            .then((User) =>
                res.send({
                    message: 'Change Password Successfully',
                    user: User,
                })
            )
            .catch(() => res.send({ message: 'User Not Found !!!' }));
    };

    // [GET] /
    show(req, res, next) {
        Promise.all([userModel.find({}), userModel.countDocumentsDeleted()])
            .then(([Users, deletedCount]) =>
                res.json({
                    deletedCount,
                    Users,
                })
            )
            .catch(next);
    }

    //[GET] /login-google/callback || /login-facebook/callback
    redirectToken(req, res) {
        res.redirect('http://localhost:3000');
    }

    //[GET] /login-google/success || /login-facebook/success
    successLogin(req, res, next) {
        res.send(req.user);
    }

    //[GET] /login-google/failed
    loginGoogleFailed(req, res, next) {
        res.status(401).send({
            message: 'Đăng nhập tài khoản Google không thành công. ',
        });
    }

    // [GET] /trash
    trash(req, res, next) {
        userModel
            .findDeleted({})
            .then((Users) => res.json(Users))
            .catch(next);
    }

    // [POST] /:id
    getRole(req, res, next) {
        userModel
            .findById(req.body.id)
            .then((User) => res.json(User.role))
            .catch(next);
    }

    // [GET] /:id/edit
    edit(req, res, next) {
        userModel
            .findById(req.params.id)
            .then((User) => res.send(User))
            .catch(next);
    }

    // [PUT] /:id
    update(req, res, next) {
        userModel
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send({ message: 'Update Successfully !!!' }))
            .catch(next);
    }

    // [DELETE] /:id
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        userModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(next);
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        userModel
            .deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(next);
    }

    // [PATCH] /:id/restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                userModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.json({ error: err });
        }
    }

    // [PATCH] /:id/favorites
    addFavorites = async (req, res, next) => {
        try {
            const user = await userModel.findOne({ _id: req.params.id });
            var check = false;
            if (user) {
                user.favorites.forEach((item, index) => {
                    if (item._id.toString() === req.body.idPro) {
                        user.favorites.splice(index, 1);
                        return (check = true);
                    }
                });
                if (check === false) {
                    user.favorites.push(req.body.idPro);
                }
            }
            userModel
                .findOneAndUpdate({ _id: user.id }, user, {
                    returnOriginal: false,
                })
                .then(() => res.send('Action Successfully !!!'))
                .catch(next);
        } catch (error) {
            res.send({ error: error });
        }
    };

    // [POST] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             userModel.delete({ _id: { $in: req.body.UserIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }
}

module.exports = new UserController();
