const { JsonWebTokenError } = require('jsonwebtoken');
const productModel = require('../models/ProductModel');
const uploadFile = require('../util/multerProduct');

class ProductController {
    uploadImg = uploadFile.array('image');

    /* ----Begin Actions Add product ---- */
    //UploadImage
    uploadMultiImg = async (req, res, next) => {
        try {
            res.send('File Uploaded Successfully');
        } catch (error) {
            res.send(error.message);
        }
    };

    // [POST] /store
    store(req, res, next) {
        const info = JSON.parse(req.body.infos);
        let imagesArray = '';
        req.files.forEach((element, key) => {
            imagesArray += element.path.slice(25) + ',';
        });
        const product = new productModel({
            name: info.name,
            image: imagesArray.slice(0, -1),
            categoryId: info.categoryId,
            color: info.color,
            size: info.size,
            details: info.details,
            type: info.type,
            price: info.price,
            priceDiscount: info.priceDiscount,
            quantity: info.quantity,
            status: info.status,
        });
        product
            .save()
            .then(() =>
                res.json({
                    info: {
                        product,
                    },
                    message: {
                        message: 'Add Product Successfully !!!',
                    },
                })
            )
            .catch((err) => {
                res.json({ error: err });
            });
    }

    createReviews = async (req, res, next) => {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        if (product) {
            if (
                product.reviews.find((x) => x.idUser.toString() === req.body.id)
            ) {
                return res
                    .status(400)
                    .send({ message: 'Bạn đã đánh giá sản phẩm này rồi.' });
            }
            const review = {
                idUser: req.body.id,
                sex: Number(req.body.sex),
                name: req.body.name,
                rating: Number(req.body.rate),
                comment: req.body.cmt,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((a, c) => c.rating + a, 0) /
                product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: 'Đã đánh giá!',
                review: updatedProduct.reviews[
                    updatedProduct.reviews.length - 1
                ],
            });
        } else {
            res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
        }
    };

    /* ----End Actions Add product ---- */

    /* ----Begin Actions Show product ---- */
    // [GET] /
    show = async (req, res, next) => {
        Promise.all([
            await productModel.find({}, null, { sort: { createdAt: -1 } }),
            productModel.countDocumentsDeleted(),
        ])
            .then(([Products, deletedCount]) =>
                res.json({
                    deletedCount,
                    Products,
                })
            )
            .catch(next);
    };

    // [GET] /search
    search = async (req, res, next) => {
        var key = req.query.key;
        const pro = await productModel.find({});
        var data = pro.filter(function (item) {
            return item.name.toLowerCase().indexOf(key) !== -1;
        });
        res.json(data);
    };

    // [GET] /:id/edit
    showById(req, res, next) {
        productModel
            .findOne({ _id: req.params.id })
            .then((product) => {
                res.json(product);
            })
            .catch(next);
    }

    // [GET] /:slug
    showBySlug(req, res, next) {
        productModel
            .findOne({ slug: req.params.slug })
            .then((product) => {
                res.json(product);
            })
            .catch(next);
    }

    // [GET] /trash
    trash(req, res, next) {
        productModel
            .findDeleted({})
            .then((products) => res.json(products))
            .catch(next);
    }
    /* ----End Actions Show product ---- */

    // [GET] /:slug
    // showBySlug(req, res, next) {
    //     productModel.findOne({ slug: req.params.slug })
    //         .then(products => {
    //             res.json(products)
    //         })
    //         .catch(next)
    // }

    /* ----Begin Actions Update product ---- */
    // [PATCH] /:id/active
    active = async (req, res, next) => {
        try {
            const product = await productModel.findOne({ _id: req.params.id });
            const show = { status: '1' };
            const hidden = { status: '0' };
            product.status === '1'
                ? productModel
                      .findOneAndUpdate({ _id: product.id }, hidden, {
                          returnOriginal: false,
                      })
                      .then(() => res.send('hidden'))
                      .catch(next)
                : productModel
                      .findOneAndUpdate({ _id: req.params.id }, show, {
                          returnOriginal: false,
                      })
                      .then(() => res.send('show'))
                      .catch(next);
        } catch (error) {
            res.send({ error: 'Error' });
        }
    };

    // [PUT] /:id
    update(req, res, next) {
        const info = JSON.parse(req.body.infos);
        let imagesArray = info.image;
        let arr = '';

        if (req.files.length !== 0) {
            req.files.forEach((element, key) => {
                arr += element.path.slice(25) + ',';
            });
            imagesArray = arr.slice(0, -1);
        }
        productModel
            .updateOne(
                { _id: req.params.id },
                {
                    name: info.name,
                    image: imagesArray,
                    categoryId: info.categoryId,
                    color: info.color,
                    type: info.type,
                    size: info.size,
                    details: info.details,
                    price: info.price,
                    priceDiscount: info.priceDiscount,
                    quantity: info.quantity,
                    status: info.status,
                }
            )
            .then(() => res.send({ message: 'Update Successfully !!!' }))
            .catch(() => res.send({ message: 'Product Undefine !!!' }));
    }

    // [PATCH] /decreaseQty
    decreaseQty(req, res, next) {
        try {
            req.body.orderItems.forEach((value) => {
                var pro = productModel.findOne({ _id: value.id });
                var decrQty = { quantity: value.inStock - value.quantity };
                productModel
                    .findOneAndUpdate({ _id: value.id }, decrQty, {
                        returnOriginal: false,
                    })
                    .then(() => res.send('Decrease Quantity Successfully !!!'))
                    .catch(next);
            });
        } catch (error) {
            res.json({ error: err });
        }
    }

    // [PATCH] /mark-all
    markAll = async (req, res, next) => {
        try {
            productModel
                .updateMany(
                    {},
                    { $set: { 'reviews.$[elem].notify': false } },
                    {
                        arrayFilters: [{ 'elem.notify': { $gte: true } }],
                    }
                )
                .then(() => res.send('Mark Successfully !!!'))
                .catch(next);
        } catch (error) {
            res.send({ mess: 'error' });
        }
    };
    /* ----End Actions Update product ---- */

    /* ----Begin Actions Delete product ---- */
    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');

        productModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(next);
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        productModel
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
                productModel.restore({ _id: value }, (err, result) => {
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
    //             productModel.delete({ _id: { $in: req.body.productIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }
}

module.exports = new ProductController();
