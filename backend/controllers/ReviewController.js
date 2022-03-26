const reviewModel = require('../models/ReviewModel');
const { mongooseToObject } = require('../util/mongoose');
const uploadFile = require('../util/multer');

class ReviewController {

    uploadImg = uploadFile.single('image');

    // [GET] /create
    create(req, res, next) {
        res.send('not found');
    }

    // [POST] /store
    store(req, res, next) {
        const review = new reviewModel(req.body);
        review.save()
            .then(() => res.json(review))
            .catch(next)
    }

    // [GET] /
    show(req, res, next) {
        Promise.all([reviewModel.find({}), reviewModel.countDocumentsDeleted()])
            .then(([reviews, deletedCount]) =>
                res.json({
                    deletedCount,
                    reviews
                })
                // res.render('me/stored-review', {
                //     deletedCount,
                //     review: mutipleMongooseToObject(review),
                // })
            )
            .catch(next)
    }

    // [GET] /trash
    trash(req, res, next) {
        reviewModel.findDeleted({})
            .then(reviews => res.json(reviews))
            // .then(category => res.render('me/trash-courses', {
            //     category: mutipleMongooseToObject(category)
            // }))
            .catch(next)
    }

    // [GET] /:slug
    // showBySlug(req, res, next) {
    //     reviewModel.findOne({ slug: req.params.slug })
    //         .then(reviews => {
    //             // res.send(review, {
    //             // review: mongooseToObject(review)
    //             // });
    //             res.send(reviews)
    //         })
    //         .catch(next)
    // }



    // [GET] /:id/edit
    edit(req, res, next) {
        reviewModel.findById(req.params.id)
            .then(review => res.send(review
                // , {
                //     review: mongooseToObject(course)
                // }
            ))
            .catch(next)
    }

    // [PUT] /:id
    update(req, res, next) {
        reviewModel.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send(req.body)
                // res.redirect('/me/stored/courses')
            )
            .catch(next)
    }

    // [DELETE] /:id
    destroy(req, res, next) {
        reviewModel.delete({ _id: req.params.id })
            // .then(() => res.redirect('back'))
            .then(() => res.send('Đã xóa thành công !!!'))
            .catch(next);
    }

    // [DELETE] /:id/force
    forceDestroy(req, res, next) {
        reviewModel.deleteOne({ _id: req.params.id })
            // .then(() => res.redirect('back'))
            .then(() => res.send('Đã xóa vĩnh viễn thành công !!!'))
            .catch(next);
    }

    // [PATCH] /:id/restore
    restore(req, res, next) {
        reviewModel.restore({ _id: req.params.id })
            // .then(() => res.redirect('back'))
            .then(() => res.send('Đã khôi phục thành công !!!'))
            .catch(next);
    }

    // [POST] /handle-form-actions
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                reviewModel.delete({ _id: { $in: req.body.reviewIds } })
                    // .then(() => res.redirect('back'))
                    .then(() => res.send('Đã xóa các bình luận đã chọn !!!'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action in invalid' })
        }
    }

}

module.exports = new ReviewController();