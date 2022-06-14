import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Nav from '../../components/Nav';
import { getCategories } from '../../redux/actions/categoryActions';
import { deleteCart } from '../../redux/actions/cartActions';
import { getProducts, getSearch } from '../../redux/actions/productActions';
import './header.scss';
import { getUser } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';

const Header = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const lstCate = useSelector((state) => state.category.categories);
    const lstPro = useSelector((state) => state.product.products_list);
    const numberCart = useSelector((state) => state.cart.numberCart);
    const proCart = useSelector((state) => state.cart.carts);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const userId = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))._id
        : '';
    const user = useSelector((state) => state.user.user);

    const image = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')).avatar || ''
        : '';

    const onChangeHandler = (text) => {
        let matches = [];
        if (text.charCodeAt(0) === 43) {
            toast.warning(
                'Ký tự bạn nhập không phù hợp. Vui lòng nhập ký tự khác.'
            );
            return;
        }
        if (lstPro && lstPro.Products) {
            matches = lstPro.Products.filter((item) => {
                return item.name.toLowerCase().match(text.toLowerCase());
            });
            setSuggestions(matches);
            setSearch(text);
        }
    };

    const onSuggestHandler = (text) => {
        setSearch(text);
        setSuggestions([]);
    };

    const handleFind = () => {
        if (search.length !== 0) {
            dispatch(getSearch(search.toLowerCase()));
            history.push(`/tim-kiem?key=${search.toLowerCase()}`);
            setSuggestions([]);
        }
    };

    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            handleFind();
        }
    };

    var total = 0;

    const ToTalPro = (price, quantity) => {
        total += price * quantity;
    };

    const checkImage = (key) => {
        let Arr = [];
        proCart.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
        });
        return Arr[key];
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
        if (userId !== '') {
            dispatch(getUser(userId));
        }
    }, [dispatch, userId]);

    return (
        <header className="header-section">
            <div className="header-top">
                <div className="container">
                    <div className="ht-left">
                        <div className="mail-service">
                            <i className=" fa fa-envelope"></i>
                            bluroller161@gmail.com
                        </div>
                        <div className="phone-service">
                            <i className=" fa fa-phone"></i>
                            +84 386256124
                        </div>
                    </div>
                    <div className="ht-right">
                        {localStorage.getItem('userInfo') ? (
                            <Link
                                to="/thong-tin-tai-khoan"
                                className="login-panel"
                            >
                                {image.length !== 0 ? (
                                    <img
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                        }}
                                        src={`http://localhost:5000/users/${image}`}
                                        alt=""
                                    />
                                ) : (
                                    <i className="fa fa-user"></i>
                                )}{' '}
                                {
                                    JSON.parse(localStorage.getItem('userInfo'))
                                        .lastName
                                }
                            </Link>
                        ) : (
                            <Link to="/dang-nhap" className="login-panel">
                                <i className="fa fa-user"></i>Đăng nhập
                            </Link>
                        )}

                        <div className="top-social">
                            <a href="/#">
                                <i className="ti-facebook"></i>
                            </a>
                            <a href="/#">
                                <i className="ti-twitter-alt"></i>
                            </a>
                            <a href="/#">
                                <i className="ti-linkedin"></i>
                            </a>
                            <a href="/#">
                                <i className="ti-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="inner-header">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <div className="logo">
                                <a href="/">
                                    <img src="assets/img/logo.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7">
                            <div className="advanced-search">
                                <div className="input-group">
                                    <input
                                        value={search}
                                        type="text"
                                        onChange={(e) =>
                                            onChangeHandler(e.target.value)
                                        }
                                        onBlur={() => {
                                            setTimeout(() => {
                                                setSuggestions([]);
                                            }, 1000);
                                        }}
                                        onKeyPress={(e) => handleKeypress(e)}
                                        placeholder="Nhập từ khóa tìm kiếm"
                                    />
                                    <div className="col-md-11 justify-content-md-center show-suggestions">
                                        {suggestions &&
                                            suggestions.map((value, i) => (
                                                <div
                                                    key={i}
                                                    className="col-md-12 suggest"
                                                    onClick={() =>
                                                        onSuggestHandler(
                                                            value.name
                                                        )
                                                    }
                                                >
                                                    {value.name}
                                                </div>
                                            ))}
                                    </div>
                                    <button type="submit" onClick={handleFind}>
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 text-right col-md-3">
                            <ul className="nav-right">
                                {localStorage.getItem('userInfo') ? (
                                    <li className="heart-icon">
                                        <Link to="/danh-muc-ua-thich">
                                            <i className="icon_heart_alt"></i>
                                            {user && user.favorites ? (
                                                <span>
                                                    {user.favorites.length}
                                                </span>
                                            ) : (
                                                <span>0</span>
                                            )}
                                        </Link>
                                    </li>
                                ) : null}
                                <li className="cart-icon">
                                    <Link to="/xem-gio-hang">
                                        <i className="icon_bag_alt"></i>
                                        <span>{numberCart}</span>
                                    </Link>
                                    {numberCart !== 0 ? (
                                        <div className="cart-hover">
                                            <div className="select-items">
                                                <table>
                                                    <tbody>
                                                        {proCart.map(
                                                            (item, key) => {
                                                                ToTalPro(
                                                                    item.price,
                                                                    item.quantity
                                                                );
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            key
                                                                        }
                                                                    >
                                                                        <td className="si-pic">
                                                                            <img
                                                                                src={`http://localhost:5000/products/${checkImage(
                                                                                    key
                                                                                )}`}
                                                                                alt=""
                                                                            />
                                                                        </td>
                                                                        <td className="si-text">
                                                                            <div className="product-selected">
                                                                                <p>
                                                                                    {formatVND(
                                                                                        item.price
                                                                                    )}{' '}
                                                                                    x{' '}
                                                                                    {
                                                                                        item.quantity
                                                                                    }
                                                                                </p>
                                                                                <h6>
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </h6>
                                                                            </div>
                                                                        </td>
                                                                        <td className="si-close">
                                                                            <i
                                                                                className="ti-close"
                                                                                onClick={() =>
                                                                                    dispatch(
                                                                                        deleteCart(
                                                                                            key
                                                                                        )
                                                                                    )
                                                                                }
                                                                            ></i>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="select-total">
                                                <span>Tổng tiền:</span>
                                                <h5>{formatVND(total)}</h5>
                                            </div>
                                            <div className="select-button">
                                                <Link
                                                    to="/xem-gio-hang"
                                                    className="primary-btn view-card"
                                                >
                                                    Xem giỏ hàng
                                                </Link>
                                                <Link
                                                    to="/xem-gio-hang/check-out"
                                                    className="primary-btn checkout-btn"
                                                >
                                                    Thanh toán
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </li>
                                <li className="cart-price">
                                    {formatVND(total)}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {lstCate.Categories ? (
                <Nav listCate={lstCate.Categories} />
            ) : (
                <Nav listCate={[]} />
            )}
        </header>
    );
};

export default Header;
