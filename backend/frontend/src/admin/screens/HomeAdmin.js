import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link,
    Route,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PRODUCT_MARK_ALL_RESET } from '../../constants/productConstant';
import { ScrollToTop } from '../../components/Scroll/ScrollToTop';
import { activeContacts, listContact } from '../../redux/actions/contactAction';
import {
    getProducts,
    markAllProducts,
} from '../../redux/actions/productActions';
import Content from '../layouts/Content/Content';
import Footer from '../layouts/Footer/Footer';
import Category from './CategoriesScreen';
import Color from './ColorsScreen';
import Contact from './ContactsScreen';
import Image from './ImagesScreen';
import Order from './OrdersScreen';
import Page from './PagesScreen';
import Post from './PostsScreen';
import Product from './ProductsScreen';
import Size from './SizesScreen';
import Topic from './TopicsScreen';
import User from './UsersScreen';
import './style/home.scss';

const HomeAdmin = () => {
    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contact.contacts);
    const products = useSelector((state) => state.product.products_list);
    const proMarkAll = useSelector((state) => state.product);
    const [markAll, setMarkAll] = useState(true);

    var notify = 0;
    var mess = [];

    const {
        // loading: loadingReviewCreate,
        error: errorMarkAll,
        success: successMarkAll,
    } = proMarkAll;

    if (products && products.Products) {
        var messArray = [];
        products.Products.forEach((pro) => {
            if (pro.reviews) {
                pro.reviews.forEach((item) => {
                    if (item.notify === true) {
                        var timeAgo = moment(item.createdAt).local();
                        messArray.push({
                            name: item.name,
                            slug: pro.slug,
                            message: item.comment,
                            time: moment(timeAgo).fromNow(),
                            sortTime: timeAgo,
                        });
                        notify++;
                    }
                });
            }
        });
        mess = messArray.sort(({ time: a }, { time: b }) =>
            a > b ? 1 : a < b ? -1 : 0
        );
    }
    var send = [];
    if (contact.Contacts) {
        send = contact.Contacts.filter((value) => value.status === false);
    }
    let { path } = useRouteMatch();
    let history = useHistory();

    const animateSidabar = () => {
        const sidebarNavWrapper = document.querySelector(
            '.sidebar-nav-wrapper'
        );
        const mainWrapper = document.querySelector('.main-wrapper');
        const menuToggleButton = document.querySelector('#menu-toggle');
        const menuToggleButtonIcon = document.querySelector('#menu-toggle i');

        menuToggleButton.addEventListener('click', () => {
            sidebarNavWrapper.classList.toggle('active');
            mainWrapper.classList.toggle('active');

            if (document.body.clientWidth > 1200) {
                if (
                    menuToggleButtonIcon.classList.contains('lni-chevron-left')
                ) {
                    menuToggleButtonIcon.classList.remove('lni-chevron-left');
                    menuToggleButtonIcon.classList.add('lni-menu');
                } else {
                    menuToggleButtonIcon.classList.remove('lni-menu');
                    menuToggleButtonIcon.classList.add('lni-chevron-left');
                }
            } else {
                if (
                    menuToggleButtonIcon.classList.contains('lni-chevron-left')
                ) {
                    menuToggleButtonIcon.classList.remove('lni-chevron-left');
                    menuToggleButtonIcon.classList.add('lni-menu');
                }
            }
        });
    };

    function handleClick() {
        history.push('/');
    }

    const handleMarkNotify = () => {
        if (notify !== 0 && mess.length !== 0) {
            dispatch(markAllProducts());
        }
    };

    useEffect(() => {
        if (successMarkAll === true) {
            toast.success('Không còn thông báo nào cả !.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setMarkAll(false);
            dispatch({ type: PRODUCT_MARK_ALL_RESET });
        }

        if (errorMarkAll) {
            toast.error('Có lỗi !.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (!products) {
            dispatch(getProducts());
        }
        dispatch(listContact());
        if (!window.location.hash) {
            window.location = window.location + '#admin';
        }
        animateSidabar();
    }, [dispatch, errorMarkAll, products, successMarkAll]);
    return (
        <>
            <div>
                {/* -- ======== sidebar-nav start =========== -- */}
                <aside className="sidebar-nav-wrapper">
                    <div className="navbar-logo">
                        <Link
                            to="/admin"
                            onClick={() => history.push('/admin')}
                        >
                            <img
                                src="admin/assets/images/logo/logo.svg"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <nav className="sidebar-nav">
                        <ul>
                            <li className="nav-item__admin">
                                <Link to="/" onClick={handleClick}>
                                    <span className="icon">
                                        <i className="lni lni-home"></i>
                                    </span>
                                    <span className="text">
                                        Trang chủ Fashi
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_1"
                                    aria-controls="ddmenu_1"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-dropbox"></i>
                                    </span>
                                    <span className="text">Sản Phẩm</span>
                                </a>
                                <ul
                                    id="ddmenu_1"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/products">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Sản Phẩm
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/colors">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Màu
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/sizes">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Sizes
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_2"
                                    aria-controls="ddmenu_2"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-layout"></i>
                                    </span>
                                    <span className="text">Danh Mục</span>
                                </a>
                                <ul
                                    id="ddmenu_2"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/categories">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Danh Mục
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_3"
                                    aria-controls="ddmenu_3"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-blogger"></i>
                                    </span>
                                    <span className="text">Tin Tức</span>
                                </a>
                                <ul
                                    id="ddmenu_3"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/topics">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Chủ Đề
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/posts">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Tin Tức
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_4"
                                    aria-controls="ddmenu_4"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-image"></i>
                                    </span>
                                    <span className="text">Hình Ảnh</span>
                                </a>
                                <ul
                                    id="ddmenu_4"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/images">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Hình Ảnh
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_5"
                                    aria-controls="ddmenu_5"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-users"></i>
                                    </span>
                                    <span className="text">Tài Khoản </span>
                                </a>
                                <ul
                                    id="ddmenu_5"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/users">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Tài Khoản
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_6"
                                    aria-controls="ddmenu_6"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-package"></i>
                                    </span>
                                    <span className="text">Đơn Hàng</span>
                                </a>
                                <ul
                                    id="ddmenu_6"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/orders">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Đơn Hàng
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_7"
                                    aria-controls="ddmenu_7"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-check-box"></i>
                                    </span>
                                    <span className="text"> Liên Hệ </span>
                                </a>
                                <ul
                                    id="ddmenu_7"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/contacts">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Liên Hệ
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item__admin nav-item-has-children">
                                <a
                                    href="#0"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ddmenu_8"
                                    aria-controls="ddmenu_8"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon">
                                        <i className="lni lni-grid-alt"></i>
                                    </span>
                                    <span className="text"> Trang </span>
                                </a>
                                <ul
                                    id="ddmenu_8"
                                    className="collapse dropdown-nav"
                                >
                                    <li>
                                        <Link to="/admin/pages">
                                            <i className="lni lni-arrow-right"></i>{' '}
                                            Quản Lý Trang
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="overlay"></div>
                {/* -- ======== sidebar-nav end =========== -- */}

                {/* -- ======== main-wrapper start =========== -- */}
                <main className="main-wrapper">
                    {/* -- ========== header start ========== -- */}
                    <header className="header__admin">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-6">
                                    <div className="header-left d-flex align-items-center">
                                        <div className="menu-toggle-btn mr-20">
                                            <button
                                                id="menu-toggle"
                                                className="main-btn primary-btn__admin btn-hover"
                                            >
                                                <i className="lni lni-chevron-left me-2"></i>{' '}
                                                Menu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7 col-6">
                                    <div className="header-right">
                                        {/* -- notification start -- */}
                                        <div className="notification-box ml-15 d-none d-md-flex">
                                            <button
                                                className="dropdown-toggle"
                                                type="button"
                                                id="notification"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="lni lni-alarm"></i>
                                                <span>
                                                    {markAll === true
                                                        ? notify
                                                        : 0}
                                                </span>
                                            </button>
                                            <ul
                                                className="dropdown-menu dropdown-menu-end notify-show"
                                                aria-labelledby="notification"
                                                data-popper-placement="bottom-end"
                                                style={{
                                                    position: 'absolute',
                                                    inset: '0px auto auto 0px',
                                                    margin: '0px',
                                                    transform:
                                                        'translate(-304px, 48px)',
                                                }}
                                            >
                                                <li className="mark-all-notify">
                                                    <input
                                                        onClick={() =>
                                                            handleMarkNotify()
                                                        }
                                                        className="mark-button"
                                                        type={'button'}
                                                        value={
                                                            'Đánh dấu đã đọc'
                                                        }
                                                    />
                                                </li>
                                                {mess.length !== 0 &&
                                                markAll === true ? (
                                                    mess.map((value, key) => {
                                                        return (
                                                            <li key={key}>
                                                                <Link
                                                                    to={`/product/${value.slug}`}
                                                                >
                                                                    <div className="image">
                                                                        <img
                                                                            src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-cute/avatar-cute-12.jpg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="content">
                                                                        <h6>
                                                                            {
                                                                                value.name
                                                                            }
                                                                            <span className="text-regular">
                                                                                {' '}
                                                                                đã
                                                                                đánh
                                                                                giá
                                                                                sản
                                                                                phẩm
                                                                                của
                                                                                bạn
                                                                            </span>
                                                                        </h6>
                                                                        <p>
                                                                            {
                                                                                value.message
                                                                            }
                                                                        </p>
                                                                        <span>
                                                                            {
                                                                                value.time
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })
                                                ) : (
                                                    <li>
                                                        <div className="content">
                                                            <p>
                                                                Không có thông
                                                                báo
                                                            </p>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        {/* -- notification end -- */}
                                        {/* -- message start -- */}
                                        <div className="header-message-box ml-15 d-none d-md-flex">
                                            <button
                                                className="dropdown-toggle"
                                                type="button"
                                                id="message"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="lni lni-envelope"></i>
                                                <span>{send.length}</span>
                                            </button>
                                            <ul
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="message"
                                            >
                                                {send.length !== 0 ? (
                                                    send.map((value) => {
                                                        return (
                                                            <li
                                                                key={value._id}
                                                                onClick={() =>
                                                                    dispatch(
                                                                        activeContacts(
                                                                            value._id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <Link
                                                                    to={`/admin/contacts/${value._id}`}
                                                                >
                                                                    <div className="image">
                                                                        <img
                                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp0xKoXUryp0JZ1Sxp-99eQiQcFrmA1M1qbQ&usqp=CAU"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="content">
                                                                        <h6>
                                                                            {
                                                                                value.name
                                                                            }
                                                                        </h6>
                                                                        <p>
                                                                            {
                                                                                value.message
                                                                            }
                                                                        </p>
                                                                        <span>
                                                                            {moment(
                                                                                value.createAt
                                                                            )
                                                                                .utc()
                                                                                .format(
                                                                                    'MMM DD, YYYY hh:ss'
                                                                                )}
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })
                                                ) : (
                                                    <li>
                                                        <div className="content">
                                                            <p>
                                                                Thùng Thư Rỗng
                                                            </p>{' '}
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        {/* -- message end -- */}
                                        {/* -- filter start -- */}
                                        {/* <div className="filter-box ml-15 d-none d-md-flex">
                                            <button className="" type="button" id="filter">
                                                <i className="lni lni-funnel"></i>
                                            </button>
                                        </div> */}
                                        {/* -- filter end -- */}
                                        {/* -- profile start -- */}
                                        <div className="profile-box ml-15">
                                            <button
                                                className="dropdown-toggle bg-transparent border-0"
                                                type="button"
                                                id="profile"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <div className="profile-info">
                                                    <div className="info">
                                                        <h6>
                                                            {localStorage.getItem(
                                                                'userInfo'
                                                            )
                                                                ? JSON.parse(
                                                                      localStorage.getItem(
                                                                          'userInfo'
                                                                      )
                                                                  ).lastName
                                                                : 'Admin'}
                                                        </h6>
                                                        <div className="image">
                                                            <img
                                                                src="https://cdn-icons-png.flaticon.com/512/1421/1421222.png"
                                                                alt=""
                                                            />
                                                            <span className="status"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <i className="lni lni-chevron-down"></i>
                                            </button>
                                            <ul
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="profile"
                                            >
                                                {/* <li>
                                                    <a href="#0">
                                                        <i className="lni lni-user"></i>{" "}
                                                        Xem Thông Tin
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#0">
                                                        <i className="lni lni-alarm"></i>{" "}
                                                        Thông Báo
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#0">
                                                        {" "}
                                                        <i className="lni lni-inbox"></i>{" "}
                                                        Tin Nhắn{" "}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#0">
                                                        {" "}
                                                        <i className="lni lni-cog"></i>{" "}
                                                        Cài Đặt{" "}
                                                    </a>
                                                </li> */}
                                                <li>
                                                    <Link to="/logout">
                                                        <i className="lni lni-exit"></i>
                                                        Đăng Xuất
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* -- profile end -- */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <Switch>
                        <Route exact path={path} component={Content} />
                        <Route path={`${path}/products`} component={Product} />
                        <Route path={`${path}/colors`} component={Color} />
                        <Route path={`${path}/sizes`} component={Size} />
                        <Route
                            path={`${path}/categories`}
                            component={Category}
                        />
                        <Route path={`${path}/topics`} component={Topic} />
                        <Route path={`${path}/posts`} component={Post} />
                        <Route path={`${path}/images`} component={Image} />
                        <Route path={`${path}/users`} component={User} />
                        <Route path={`${path}/orders`} component={Order} />
                        <Route path={`${path}/contacts`} component={Contact} />
                        <Route path={`${path}/pages`} component={Page} />
                    </Switch>
                    {/* -- ========== footer start =========== -- */}
                    <Footer />
                    {/* -- ========== footer end =========== -- */}
                </main>
            </div>
            <ScrollToTop />
        </>
    );
};

export default HomeAdmin;
