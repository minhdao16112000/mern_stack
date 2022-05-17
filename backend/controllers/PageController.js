const { JsonWebTokenError } = require('jsonwebtoken');
const pageModel = require('../models/PageModel');

class PageController {
    /* ----Begin Actions Add Page ---- */

    // [POST] /store
    store(req, res, next) {
        const page = new pageModel(req.body);
        page.save()
            .then(() => res.send(page))
            .catch(next);
    }

    /* ----End Actions Add Page ---- */

    /* ----Begin Actions Update Page ---- */

    // [PUT] /:id
    update = async (req, res, next) => {
        const pages = await pageModel.findOne({ _id: req.params.id });
        if (pages) {
            pages.title = req.body.values.title;
            pages.content = req.body.values.content;
            pages.updatedBy = req.body.values.updatedBy;
        }
        pageModel
            .findOneAndUpdate({ _id: pages.id }, pages, {
                returnOriginal: false,
            })
            .then((Page) =>
                res.send({ message: 'Page Update Successfully', page: Page })
            )
            .catch(() => res.send({ message: 'Page Not Found !!!' }));
    };

    // [PATCH] /:id/active
    active = async (req, res, next) => {
        try {
            const page = await pageModel.findOne({ _id: req.params.id });
            const show = { status: '1' };
            const hidden = { status: '0' };
            page.status === '1'
                ? pageModel
                      .findOneAndUpdate({ _id: page.id }, hidden, {
                          returnOriginal: false,
                      })
                      .then(() => res.send('hidden'))
                      .catch(() => res.send({ message: 'Page Not Found !!!' }))
                : pageModel
                      .findOneAndUpdate({ _id: req.params.id }, show, {
                          returnOriginal: false,
                      })
                      .then(() => res.send('show'))
                      .catch(() => res.send({ message: 'Page Not Found !!!' }));
        } catch (error) {
            res.send({ message: 'Error' });
        }
    };

    /* ----End Actions Update Page ---- */

    /* ----Begin Actions Restore Page ---- */

    // [PATCH] /restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                pageModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.send({ message: err });
        }
    }

    /* ----End Actions Restore Page ---- */

    /* ----Begin Actions Delete Page ---- */

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        pageModel
            .deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(() => res.send({ message: 'Delete Forever failed' }));
    }

    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        pageModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(() => res.send({ message: 'Delete failed' }));
    }

    /* ----End Actions Delete Page ---- */

    /* ----Begin Actions Show Page ---- */
    // [GET] /
    show(req, res, next) {
        Promise.all([pageModel.find({}), pageModel.countDocumentsDeleted()])
            .then(([Pages, deletedCount]) =>
                res.json({
                    deletedCount,
                    Pages,
                })
            )
            .catch(next);
    }

    // [GET] /:id/edit
    showById(req, res, next) {
        pageModel
            .findOne({ _id: req.params.id })
            .then((page) => {
                res.json(page);
            })
            .catch(next);
    }

    // [GET] /:slug
    showBySlug(req, res, next) {
        pageModel
            .findOne({ slug: req.params.slug })
            .then((pages) => {
                res.json(pages);
            })
            .catch(next);
    }

    // [GET] /trash
    trash(req, res, next) {
        pageModel
            .findDeleted({})
            .then((pages) => res.json(pages))
            .catch(next);
    }
    /* ----End Actions Show Page ---- */

    // [Page] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             pageModel.delete({ _id: { $in: req.body.pageIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }
}

module.exports = new PageController();
