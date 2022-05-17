const topicModel = require('../models/TopicModel');
const { mongooseToObject } = require('../util/mongoose');
// const uploadFile = require('../util/multerProduct');

class TopicController {
    // uploadImg = uploadFile.single('image');

    // uploadSingleImg = async (req, res, next) => {
    //     try {
    //         res.send('File Uploaded Successfully')
    //     } catch (error) {
    //         res.send(error.message);
    //     }
    // }

    // [POST] /store
    store(req, res, next) {
        const topic = new topicModel(req.body);
        topic
            .save()
            .then(() => res.send(topic))
            .catch(next);
    }

    // [PUT] /:id
    update(req, res, next) {
        topicModel
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send({ message: 'Update Successfully !!!' }))
            .catch((err) => {
                res.json({ error: err });
            });
    }

    // [PATCH] /restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                topicModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.send({ message: err });
        }
    }

    // [PATCH] /:id
    active = async (req, res, next) => {
        try {
            const topic = await topicModel.findOne({ _id: req.params.id });
            const show = { status: '1' };
            const hidden = { status: '0' };
            topic.status === '1'
                ? topicModel
                      .findOneAndUpdate({ _id: topic.id }, hidden, {
                          returnOriginal: false,
                      })
                      .then(() => res.send('hidden'))
                      .catch(() => res.send({ message: 'Topic Not Found !!!' }))
                : topicModel
                      .findOneAndUpdate({ _id: req.params.id }, show, {
                          returnOriginal: false,
                      })
                      .then(() => res.send('show'))
                      .catch(() =>
                          res.send({ message: 'Topic Not Found !!!' })
                      );
        } catch (error) {
            res.send({ message: 'Error' });
        }
    };

    // [DELETE] /:id/force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        topicModel
            .deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(() => res.send({ message: 'Delete Forever failed' }));
    }

    // [DELETE] /:id
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        topicModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(() => res.send({ message: 'Delete failed' }));
    }

    // [GET] /:id/edit
    edit(req, res, next) {
        topicModel
            .findById(req.params.id)
            .then((topic) => res.send(topic))
            .catch(next);
    }

    // [GET] /
    show(req, res, next) {
        Promise.all([topicModel.find({}), topicModel.countDocumentsDeleted()])
            .then(([Topics, deletedCount]) =>
                res.json({
                    deletedCount,
                    Topics,
                })
            )
            .catch(next);
    }

    // [GET] /trash
    trash(req, res, next) {
        topicModel
            .findDeleted({})
            .then((topic) => res.json(topic))
            .catch(next);
    }

    // [GET] /:slug
    // show(req, res, next) {
    //     topicModel.findOne({ slug: req.params.slug })
    //         .then(topic => {
    //             // res.send(topic, {
    //             // topic: mongooseToObject(topic)
    //             // });
    //             res.send(topic)
    //         })
    //         .catch(next)
    // }

    // [POST] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             topicModel.delete({ _id: { $in: req.body.topicIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các danh mục sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }
}

module.exports = new TopicController();
