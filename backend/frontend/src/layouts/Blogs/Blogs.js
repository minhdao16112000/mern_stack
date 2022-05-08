import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

const Blogs = () => {
    const post = useSelector((state) => state.post.posts_list);
    // const listTopic = useSelector((state) => state.topic.topics);
    var listPost = [];
    if (post.Posts) {
        const lstPost = post.Posts.filter((value) => value.status === '1');
        listPost = lstPost.sort(() => Math.random() - 0.5);
    }
    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };
    // const checkSlug = (id) => {
    //     var topicSlug = '';
    //     if (listTopic.Topics) {
    //         listTopic.Topics.forEach((value) => {
    //             if (id.includes(value._id)) {
    //                 topicSlug += value.slug + '/';
    //             }
    //         });
    //     }
    //     return topicSlug.slice(0, -1);
    // };

    return (
        <section className="latest-blog spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>TIN TỨC THỜI TRANG</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {listPost.slice(0, 3).map((value, key) => {
                        return (
                            <div key={key} className="col-lg-4 col-md-6">
                                <Link to={`/tin-tuc/${value.slug}`}>
                                    <div className="single-latest-blog">
                                        <img
                                            src={`https://shopfashi.herokuapp.com/posts/${value.image}`}
                                            alt=""
                                        />
                                        <div className="latest-text">
                                            <div className="tag-list">
                                                <div className="tag-item">
                                                    <i className="fa fa-calendar-o"></i>
                                                    {' ' +
                                                        moment(
                                                            value.createdAt.substring(
                                                                0,
                                                                10
                                                            )
                                                        ).format(
                                                            'MMM DD, YYYY'
                                                        )}
                                                </div>
                                                <div className="tag-item">
                                                    <i className="fa fa-comment-o"></i>
                                                    5
                                                </div>
                                            </div>
                                            <h4>{value.title}</h4>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: value.summary,
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className="benefit-items">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="single-benefit">
                                <div className="sb-icon">
                                    <img src="assets/img/icon-1.png" alt="" />
                                </div>
                                <div className="sb-text">
                                    <h6>Miễn phí giao hàng</h6>
                                    <p>
                                        Cho tất cả đơn hàng từ{' '}
                                        {formatVND(2000000)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-benefit">
                                <div className="sb-icon">
                                    <img src="assets/img/icon-2.png" alt="" />
                                </div>
                                <div className="sb-text">
                                    <h6>Giao hàng nhanh</h6>
                                    <p>Đối với hàng có sẵn</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-benefit">
                                <div className="sb-icon">
                                    <img src="assets/img/icon-3.png" alt="" />
                                </div>
                                <div className="sb-text">
                                    <h6>Thanh toán an toàn</h6>
                                    <p>Thanh toán an toàn 100%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
