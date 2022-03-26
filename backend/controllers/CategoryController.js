const categoryModel = require('../models/CategoryModel');
const { mongooseToObject } = require('../util/mongoose');
const uploadFile = require('../util/multerCategory.js');

class CategoryController {

    uploadImg = uploadFile.single('image');

    uploadSingleImg = async (req, res, next) => {
        try {
            res.send('File Uploaded Successfully')
        } catch (error) {
            res.send(error.message);
        }
    }

    // [POST] /store
    store(req, res, next) {
        const info = JSON.parse(req.body.infos);
        var imagesArray = '';
        let arr = '';

        if (req.file) {
            req.file.forEach((element, key) => {
                arr += element.path.slice(20) + ',';
            });
            imagesArray = arr.slice(0, -1);
        }

        const category = new categoryModel({
            name: info.name,
            image: imagesArray,
            parentCate: info.parentCate,
            type: info.type,
            status: info.status,
        });

        category.save()
            .then(() => res.json({
                info: {
                    category,
                },
                message: {
                    message: "Add Category Successfully !!!"
                }
            }))
            .catch(err => {
                res.json({ error: err });
            })
    }

    // [PUT] /:id
    update(req, res, next) {
        const info = JSON.parse(req.body.infos);
        let imagesArray = info.image;

        if (req.file) {
            imagesArray = req.file.path.slice(25)
        }

        categoryModel.updateOne({ _id: req.params.id }, {
            name: info.name,
            image: imagesArray,
            parentCate: info.parentCate,
            type: info.type,
            status: info.status,
        })
            .then(() => res.send({ message: "Update Successfully !!!" }))
            .catch(err => {
                res.json({ error: err });
            })
    }

    // [PATCH] /restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach(value => categoryModel.restore({ _id: value }, (err, result) => {
                if (err) throw err;
                console.log(result);
            }));
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.json({ error: err });
        }
    }
    
    // [PATCH] /:id
    active = async (req, res, next) => {
        try {
            const category = await categoryModel.findOne({ _id: req.params.id });
            const show = { status: "1" };
            const hidden = { status: "0" };
            category.status === "1"
                ? categoryModel.findOneAndUpdate({ _id: category.id }, hidden, {
                    returnOriginal: false
                })
                    .then(() => res.send('hidden'))
                    .catch(next)
                : categoryModel.findOneAndUpdate({ _id: req.params.id }, show, {
                    returnOriginal: false
                })
                    .then(() => res.send('show'))
                    .catch(next)
        } catch (error) {
            res.send({ error: "Error" });
        }
    }

    // [DELETE] /:id/force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        categoryModel.deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(next);
    }

    // [DELETE] /:id
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        categoryModel.delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(next);
    }

    // [GET] /:id/edit
    edit(req, res, next) {
        categoryModel.findById(req.params.id)
            .then(category => res.send(category))
            .catch(next)
    }

    // [GET] /
    show(req, res, next) {
        Promise.all([categoryModel.find({}), categoryModel.countDocumentsDeleted()])
            .then(([Categories, deletedCount]) =>
                res.json({
                    deletedCount,
                    Categories
                })
            )
            .catch(next)
    }

    // [GET] /trash
    trash(req, res, next) {
        categoryModel.findDeleted({})
            .then(category => res.json(category))
            .catch(next)
    }

    // [GET] /:slug
    // show(req, res, next) {
    //     categoryModel.findOne({ slug: req.params.slug })
    //         .then(category => {
    //             // res.send(category, {
    //             // category: mongooseToObject(category)
    //             // });
    //             res.send(category)
    //         })
    //         .catch(next)
    // }
    
    // [POST] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             categoryModel.delete({ _id: { $in: req.body.categoryIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các danh mục sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }

}

module.exports = new CategoryController();