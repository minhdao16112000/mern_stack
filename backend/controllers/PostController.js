const { JsonWebTokenError } = require('jsonwebtoken');
const postModel = require('../models/PostModel');
const uploadFile = require('../util/multerPost');

class PostController {
    uploadImg = uploadFile.single('image');

    /* ----Begin Actions Add Post ---- */

    //UploadImage
    uploadSingleImg = async (req, res, next) => {
        try {
            res.send('File Uploaded Successfully');
        } catch (error) {
            res.send(error.message);
        }
    };

    // [POST] /store
    store(req, res, next) {
        const info = JSON.parse(req.body.infos);
        console.log(req.file.path);
        const post = new postModel({
            image: req.file.path.slice(14),
            topicId: info.topicId,
            productId: info.productId,
            title: info.title,
            summary: info.summary,
            content: info.content,
            type: info.type,
            createdBy: info.createdBy,
            status: info.status,
        });
        post.save()
            .then(() =>
                res.json({
                    info: {
                        post,
                    },
                    message: {
                        message: 'Add Post Successfully !!!',
                    },
                })
            )
            .catch((err) => {
                res.json({ error: err });
            });
    }

    /* ----End Actions Add Post ---- */

    /* ----Begin Actions Update Post ---- */

    // [PUT] /:id
    update(req, res, next) {
        const info = JSON.parse(req.body.infos);
        let imagesArray = info.image;

        if (req.file) {
            imagesArray = req.file.path.slice(14);
        }
        postModel
            .updateOne(
                { _id: req.params.id },
                {
                    image: imagesArray,
                    topicId: info.topicId,
                    productId: info.productId,
                    title: info.title,
                    summary: info.summary,
                    content: info.content,
                    type: info.type,
                    updatedBy: info.updatedBy,
                    status: info.status,
                }
            )
            .then(() => res.send({ message: 'Update Successfully !!!' }))
            .catch(() => res.send({ message: 'Post Undefine !!!' }));
    }

    // [PATCH] /:id/active
    active = async (req, res, next) => {
        try {
            const post = await postModel.findOne({ _id: req.params.id });
            const show = { status: '1' };
            const hidden = { status: '0' };
            post.status === '1'
                ? postModel
                      .findOneAndUpdate({ _id: post.id }, hidden, {
                          returnOriginal: false,
                      })
                      .then(() => res.send('hidden'))
                      .catch(() => res.send({ message: 'Post Not Found !!!' }))
                : postModel
                      .findOneAndUpdate({ _id: req.params.id }, show, {
                          returnOriginal: false,
                      })
                      .then(() => res.send('show'))
                      .catch(() => res.send({ message: 'Post Not Found !!!' }));
        } catch (error) {
            res.send({ message: 'Error' });
        }
    };

    /* ----End Actions Update Post ---- */

    /* ----Begin Actions Restore Post ---- */

    // [PATCH] /restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                postModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.send({ message: err });
        }
    }

    /* ----End Actions Restore Post ---- */

    /* ----Begin Actions Delete Post ---- */

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        postModel
            .deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(() => res.send({ message: 'Delete Forever failed' }));
    }

    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        postModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(() => res.send({ message: 'Delete failed' }));
    }

    /* ----End Actions Delete Post ---- */

    /* ----Begin Actions Show Post ---- */
    // [GET] /
    show(req, res, next) {
        Promise.all([
            postModel.find({}, null, { sort: { createdAt: -1 } }),
            postModel.countDocumentsDeleted(),
        ])
            .then(([Posts, deletedCount]) =>
                res.json({
                    deletedCount,
                    Posts,
                })
            )
            .catch(next);
    }

    // [GET] /:id/edit
    showById(req, res, next) {
        postModel
            .findOne({ _id: req.params.id })
            .then((post) => {
                res.json(post);
            })
            .catch(next);
    }

    // [GET] /:slug
    showBySlug(req, res, next) {
        postModel
            .findOne({ slug: req.params.slug })
            .then((posts) => {
                res.json(posts);
            })
            .catch(next);
    }

    // [GET] /trash
    trash(req, res, next) {
        postModel
            .findDeleted({})
            .then((posts) => res.json(posts))
            .catch(next);
    }
    /* ----End Actions Show Post ---- */

    // [POST] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             postModel.delete({ _id: { $in: req.body.postIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }
}

module.exports = new PostController();
