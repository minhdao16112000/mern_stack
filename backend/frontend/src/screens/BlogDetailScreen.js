import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import GoTop from '../components/GoTop/GoTop';
import { getPosts, getPostSlug } from '../redux/actions/postActions';
import { getTopics } from '../redux/actions/topicActions';
import { getProducts } from '../redux/actions/productActions';
import './styles/blog.scss';

const BlogDetailScreen = (props) => {
    const dispatch = useDispatch();
    const slug = props.match.params.slug;
    const post = useSelector((state) => state.post.post);
    const listTopic = useSelector((state) => state.topic.topics);
    const listPost = useSelector((state) => state.post.posts_list);
    const lstPro = useSelector((state) => state.product.products_list);
    const pro = [];

    var listPostByTopic = [];
    if (listPost.Posts && listPost.Posts) {
        listPostByTopic = listPost.Posts.filter(
            (value) => value.topicId === post.topicId && value.status === '1'
        );
    }
    var i = 0;

    listPostByTopic.forEach((value, key) => {
        if (value._id === post._id) {
            i = key;
        }
    });

    if (post.productId && lstPro && lstPro.Products) {
        lstPro.Products.forEach((item) => {
            if (post.productId.includes(item._id)) {
                pro.push(item);
            }
        });
    }

    const checkTopic = (id) => {
        var topicArr = [];
        if (listTopic && listTopic.Topics) {
            listTopic.Topics.forEach((value) => {
                if (id.includes(value._id)) {
                    topicArr.push(value.name);
                }
            });
        }
        return topicArr.toString();
    };

    const checkImage = (key) => {
        let Arr = [];
        pro.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
        });
        return Arr[key];
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        dispatch(getPosts());
        dispatch(getTopics());
        if (!lstPro.Products) {
            dispatch(getProducts());
        }
        if (slug) {
            dispatch(getPostSlug(slug));
        }
    }, [dispatch, lstPro.Products, slug]);

    return (
        <>
            <div>
                <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text product-more">
                                    <Link to="/">
                                        <i className="fa fa-home"></i> Trang Chủ
                                    </Link>
                                    <Link to="/tin-tuc">Tin Tức</Link>
                                    <span>Bài Viết</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* !-- Breadcrumb Section End -- */}

                {post.length !== 0 ? (
                    <section className="blog-details spad show-blogDetail">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="blog-details-inner">
                                        <div className="blog-detail-title">
                                            <h2>{post.title}</h2>
                                            <p>
                                                {checkTopic(post.topicId)}{' '}
                                                <span>
                                                    -{' '}
                                                    {post.createdAt.substring(
                                                        0,
                                                        10
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: post.summary,
                                            }}
                                        ></p>
                                        {/* <div className="blog-large-pic" >
                                        <img src={`https://shopfashi.herokuapp.com/posts/${post.image}`} alt="" />
                                    </div> */}
                                        <div
                                            className="blog-detail-desc"
                                            style={{ marginTop: '50px' }}
                                            dangerouslySetInnerHTML={{
                                                __html: post.content,
                                            }}
                                        ></div>
                                        {/* <div className="blog-quote">
                                        <p>“ Technology is nothing. What's important is that you have a faith in people, that
                                            they're basically good and smart, and if you give them tools, they'll do wonderful
                                            things with them.” <span>- Steven Jobs</span></p>
                                    </div> */}
                                        {pro.length !== 0 ? (
                                            <div className="blog-more">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="section-title">
                                                            <h2>
                                                                Có thể bạn sẽ
                                                                thích các sản
                                                                phẩm này
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {pro
                                                        .slice(0, 5)
                                                        .map((value, key) => {
                                                            return (
                                                                <div
                                                                    key={key}
                                                                    className="col-sm-4 image-pro"
                                                                >
                                                                    <Link
                                                                        to={`/product/${value.slug}`}
                                                                        onClick={() =>
                                                                            localStorage.setItem(
                                                                                'proCate',
                                                                                value.categoryId
                                                                            )
                                                                        }
                                                                    >
                                                                        <img
                                                                            style={{
                                                                                height: '300px',
                                                                            }}
                                                                            src={`https://shopfashi.herokuapp.com/products/${checkImage(
                                                                                key
                                                                            )}`}
                                                                            alt=""
                                                                        />
                                                                    </Link>
                                                                </div>
                                                            );
                                                        })}

                                                    {/* <div className="col-sm-4">
                                                        <img
                                                            src="assets/img/blog/blog-detail-2.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <img
                                                            src="assets/img/blog/blog-detail-3.jpg"
                                                            alt=""
                                                        />
                                                    </div> */}
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}

                                        <div className="tag-share">
                                            <div className="details-tag">
                                                <ul>
                                                    <li>
                                                        <i className="fa fa-tags"></i>
                                                    </li>
                                                    {listTopic.Topics &&
                                                    listTopic.Topics.length !==
                                                        0 ? (
                                                        listTopic.Topics.filter(
                                                            (item) =>
                                                                item.slug !==
                                                                props.location.pathname.split(
                                                                    '/'
                                                                )[2]
                                                        ).map((value) => {
                                                            return (
                                                                <Link
                                                                    to={`/chu-de/${value.slug}`}
                                                                    key={
                                                                        value._id
                                                                    }
                                                                >
                                                                    <li>
                                                                        {
                                                                            value.name
                                                                        }
                                                                    </li>
                                                                </Link>
                                                            );
                                                        })
                                                    ) : (
                                                        <li></li>
                                                    )}
                                                </ul>
                                            </div>
                                            {/* <div className="blog-share">
                                                <span>Share:</span>
                                                <div className="social-links">
                                                    <a href=".#">
                                                        <i className="fa fa-facebook"></i>
                                                    </a>
                                                    <a href=".#">
                                                        <i className="fa fa-twitter"></i>
                                                    </a>
                                                    <a href=".#">
                                                        <i className="fa fa-google-plus"></i>
                                                    </a>
                                                    <a href=".#">
                                                        <i className="fa fa-instagram"></i>
                                                    </a>
                                                    <a href=".#">
                                                        <i className="fa fa-youtube-play"></i>
                                                    </a>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="blog-post">
                                            <div className="row">
                                                {listPostByTopic.length !==
                                                0 ? (
                                                    i === 0 ? (
                                                        <>
                                                            <div className="col-lg-5 col-md-6"></div>
                                                            <div className="col-lg-5 offset-lg-2 col-md-6">
                                                                <Link
                                                                    to={`/tin-tuc/${
                                                                        listPostByTopic[
                                                                            i +
                                                                                1
                                                                        ].slug
                                                                    }`}
                                                                    className="next-blog"
                                                                >
                                                                    <div className="nb-pic">
                                                                        <img
                                                                            src={`https://shopfashi.herokuapp.com/posts/${
                                                                                listPostByTopic[
                                                                                    i +
                                                                                        1
                                                                                ]
                                                                                    .image
                                                                            }`}
                                                                            alt=""
                                                                        />
                                                                        <i className="ti-arrow-right"></i>
                                                                    </div>
                                                                    <div className="nb-text">
                                                                        <span>
                                                                            Tin
                                                                            Tiếp
                                                                            Theo:
                                                                        </span>
                                                                        <h5>
                                                                            {
                                                                                listPostByTopic[
                                                                                    i +
                                                                                        1
                                                                                ]
                                                                                    .title
                                                                            }
                                                                        </h5>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    ) : i ===
                                                      listPostByTopic.length -
                                                          1 ? (
                                                        <>
                                                            <div className="col-lg-5 col-md-6">
                                                                <Link
                                                                    to={`/tin-tuc/${
                                                                        listPostByTopic[
                                                                            i -
                                                                                1
                                                                        ].slug
                                                                    }`}
                                                                    className="prev-blog"
                                                                >
                                                                    <div className="pb-pic">
                                                                        <i className="ti-arrow-left"></i>
                                                                        <img
                                                                            src={`https://shopfashi.herokuapp.com/posts/${
                                                                                listPostByTopic[
                                                                                    i -
                                                                                        1
                                                                                ]
                                                                                    .image
                                                                            }`}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="pb-text">
                                                                        <span>
                                                                            Tin
                                                                            Trước:
                                                                        </span>
                                                                        <h5>
                                                                            {
                                                                                listPostByTopic[
                                                                                    i -
                                                                                        1
                                                                                ]
                                                                                    .title
                                                                            }
                                                                        </h5>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="col-lg-5 offset-lg-2 col-md-6"></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="col-lg-5 col-md-6">
                                                                <Link
                                                                    to={`/tin-tuc/${
                                                                        listPostByTopic[
                                                                            i -
                                                                                1
                                                                        ].slug
                                                                    }`}
                                                                    className="prev-blog"
                                                                >
                                                                    <div className="pb-pic">
                                                                        <i className="ti-arrow-left"></i>
                                                                        <img
                                                                            src={`https://shopfashi.herokuapp.com/posts/${
                                                                                listPostByTopic[
                                                                                    i -
                                                                                        1
                                                                                ]
                                                                                    .image
                                                                            }`}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="pb-text">
                                                                        <span>
                                                                            Tin
                                                                            Trước:
                                                                        </span>
                                                                        <h5>
                                                                            {
                                                                                listPostByTopic[
                                                                                    i -
                                                                                        1
                                                                                ]
                                                                                    .title
                                                                            }
                                                                        </h5>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="col-lg-5 offset-lg-2 col-md-6">
                                                                <Link
                                                                    to={`/tin-tuc/${
                                                                        listPostByTopic[
                                                                            i +
                                                                                1
                                                                        ].slug
                                                                    }`}
                                                                    className="next-blog"
                                                                >
                                                                    <div className="nb-pic">
                                                                        <img
                                                                            src={`https://shopfashi.herokuapp.com/posts/${
                                                                                listPostByTopic[
                                                                                    i +
                                                                                        1
                                                                                ]
                                                                                    .image
                                                                            }`}
                                                                            alt=""
                                                                        />
                                                                        <i className="ti-arrow-right"></i>
                                                                    </div>
                                                                    <div className="nb-text">
                                                                        <span>
                                                                            Tin
                                                                            Tiếp
                                                                            Theo:
                                                                        </span>
                                                                        <h5>
                                                                            {
                                                                                listPostByTopic[
                                                                                    i +
                                                                                        1
                                                                                ]
                                                                                    .title
                                                                            }
                                                                        </h5>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    )
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="blog-details spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="blog-details-inner">
                                        <div className="blog-detail-title">
                                            <h2 style={{ color: 'red' }}>
                                                Post Not Found
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default BlogDetailScreen;
