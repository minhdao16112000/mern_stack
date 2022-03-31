import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getPosts } from '../redux/actions/postActions';
import { getTopics } from '../redux/actions/topicActions';

const BlogsScreen = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    let match = useRouteMatch('/chu-de/:slug');
    const [limit, setLimit] = useState(0);
    const listTopic = useSelector((state) => state.topic.topics);
    const listPost = useSelector((state) => state.post.posts_list);
    var lstTopic = [];
    if (listTopic.Topics) {
        lstTopic = listTopic.Topics.filter((value) => value.status === '1');
    }
    var list = [];
    if (listPost.Posts) {
        list = listPost.Posts.filter((value) => value.status === '1');
    }

    if (match) {
        list = [];
        if (listTopic.Topics) {
            let slugTopic = listTopic.Topics.filter(
                (value) => value.slug === match.params.slug
            );
            slugTopic.forEach((item) => {
                listPost.Posts.forEach((value) => {
                    if (value.topicId.includes(item._id)) {
                        list.push(value);
                    }
                });
            });
        }
    }

    // console.log(list)

    const checkSlug = (id) => {
        var topicSlug = '';
        if (listTopic.Topics) {
            listTopic.Topics.forEach((value) => {
                if (id.includes(value._id)) {
                    topicSlug += value.slug + '/';
                }
            });
        }
        return topicSlug.slice(0, -1);
    };

    const checkTopic = (id) => {
        if (id && listTopic.Topics) {
            var topicArr = [];
            listTopic.Topics.forEach((value) => {
                if (id.includes(value._id)) {
                    topicArr.push(value.name);
                }
            });
            return topicArr.toString();
        }
    };

    useEffect(() => {
        setLimit(6);
        dispatch(getTopics());
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div>
            {/* !-- Breadcrumb Section Begin -- */}
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text product-more">
                                <a href="/">
                                    <i className="fa fa-home"></i> Trang Chủ
                                </a>
                                <span>Tin Tức</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* !-- Breadcrumb Section End -- */}

            {/* !-- Blog Section Begin -- */}
            <section className="blog-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1">
                            <div className="blog-sidebar">
                                <div className="blog-catagory">
                                    <h4>Chủ Đề</h4>
                                    <ul>
                                        {lstTopic.length !== 0 ? (
                                            lstTopic.map((value, key) => {
                                                return (
                                                    <li key={key}>
                                                        <Link
                                                            to={`/chu-de/${value.slug}`}
                                                        >
                                                            {value.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <li></li>
                                        )}
                                    </ul>
                                </div>
                                <div className="recent-post">
                                    <h4>Tin Tức Mới Nhất</h4>
                                    <div className="recent-blog">
                                        {list.length !== 0 ? (
                                            list.slice(0, 4).map((value) => {
                                                return (
                                                    <Link
                                                        key={value._id}
                                                        to={`/tin-tuc/${value.slug}`}
                                                        className="rb-item"
                                                    >
                                                        <div className="rb-pic">
                                                            <img
                                                                src={`https://shopfashi.herokuapp.com/posts/${value.image}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="rb-text">
                                                            <h6>
                                                                {value.title.substring(
                                                                    0,
                                                                    32
                                                                )}
                                                                ...
                                                            </h6>
                                                            <p>
                                                                {checkTopic(
                                                                    value.topicId
                                                                )}{' '}
                                                                <span>
                                                                    {value.createdAt.substring(
                                                                        0,
                                                                        10
                                                                    )}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                                {/* <div className="blog-tags">
                                    <h4>Product Tags</h4>
                                    <div className="tag-item">
                                        <a href="/#">Towel</a>
                                        <a href="/#">Shoes</a>
                                        <a href="/#">Coat</a>
                                        <a href="/#">Dresses</a>
                                        <a href="/#">Trousers</a>
                                        <a href="/#">Men's hats</a>
                                        <a href="/#">Backpack</a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2">
                            <div className="row">
                                {list.length !== 0 ? (
                                    list.slice(0, limit).map((value) => {
                                        return (
                                            <div
                                                key={value._id}
                                                className="col-lg-6 col-sm-6"
                                            >
                                                <Link
                                                    to={`/tin-tuc/${value.slug}`}
                                                >
                                                    <div className="blog-item">
                                                        <div className="bi-pic">
                                                            <img
                                                                src={`https://shopfashi.herokuapp.com/posts/${value.image}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="bi-text">
                                                            <Link
                                                                to={`/tin-tuc/${checkSlug(
                                                                    value.topicId
                                                                )}/post/${
                                                                    value.slug
                                                                }`}
                                                            >
                                                                <h4>
                                                                    {
                                                                        value.title
                                                                    }
                                                                </h4>
                                                            </Link>
                                                            <p>
                                                                {checkTopic(
                                                                    value.topicId
                                                                )}{' '}
                                                                <span>
                                                                    {value.createdAt.substring(
                                                                        0,
                                                                        10
                                                                    )}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="col-lg-12 col-sm-12">
                                        <div className="blog-item">
                                            <div className="bi-text">
                                                <h4
                                                    style={{
                                                        textAlign: 'center',
                                                        color: '#ff0000',
                                                        fontSize: '30px',
                                                        textDecoration:
                                                            'underline',
                                                    }}
                                                >
                                                    Không Có Tin Tức Nào Cả.
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {list.length !== 0 && list.length > limit ? (
                                    <div className="col-lg-12">
                                        <div
                                            className="loading-more"
                                            onClick={() => setLimit(limit + 6)}
                                        >
                                            <i className="icon_loading"></i>
                                            <Link to={location.pathname}>
                                                Xem Thêm
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* !-- Blog Section End -- */}
        </div>
    );
};

export default BlogsScreen;
