import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPages } from '../../redux/actions/pageActions';

const Footer = () => {
    const dispatch = useDispatch();
    const pages = useSelector((state) => state.page.pages_list.Pages);

    useEffect(() => {
        dispatch(getPages());
    }, [dispatch]);

    return (
        <footer className="footer-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="footer-left">
                            <div className="footer-logo">
                                <Link to="/">
                                    <img
                                        src="assets/img/footer-logo.png"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <ul>
                                <li>
                                    Địa chỉ: Tầng 16, Landmark 81, TP.HCM, Việt
                                    Nam{' '}
                                </li>
                                <li>SĐT: +84 386256124</li>
                                <li>Email: bluroller161@gmail.com</li>
                            </ul>
                            <div className="footer-social">
                                <a href="/">
                                    <i className="fa fa-facebook"></i>
                                </a>
                                <a href="/">
                                    <i className="fa fa-instagram"></i>
                                </a>
                                <a href="/">
                                    <i className="fa fa-twitter"></i>
                                </a>
                                <a href="/">
                                    <i className="fa fa-pinterest"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 offset-lg-1">
                        <div className="footer-widget">
                            <h5>Thông Tin</h5>
                            <ul>
                                {pages ? (
                                    pages.map((value) => {
                                        return (
                                            <li key={value._id}>
                                                <Link
                                                    to={`/page/${value.slug}`}
                                                >
                                                    {value.title}
                                                </Link>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li></li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="footer-widget">
                            <h5>Khách Hàng</h5>
                            <ul>
                                <li>
                                    <Link to="/thong-tin-tai-khoan">
                                        Tài khoản của bạn
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/lien-he">Liên hệ</Link>
                                </li>
                                <li>
                                    <Link to="/xem-gio-hang">Xem giỏ hàng</Link>
                                </li>
                                <li>
                                    <Link to="/xem-gio-hang/check-out">
                                        Thanh toán
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="newslatter-item">
                            <h5>Cập Nhật Thông Tin Ưu Đãi</h5>
                            <p>
                                Nhận thông tin cập nhật qua Email về cửa hàng
                                mới nhất của chúng tôi và các ưu đãi đặc biệt.
                            </p>
                            <form action="#" className="subscribe-form">
                                <input
                                    type="text"
                                    placeholder="Nhập Mail của bạn"
                                />
                                <button type="button">Xác nhận</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-reserved">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="copyright-text">
                                Copyright &copy;
                                <script>
                                    document.write(new Date().getFullYear());
                                </script>
                                All rights reserved | This template is made with{' '}
                                <i
                                    className="fa fa-heart-o"
                                    aria-hidden="true"
                                ></i>{' '}
                                by
                                <a href="https://therichpost.com"> MinhVan</a>
                            </div>
                            <div className="payment-pic">
                                <img
                                    src="assets/img/payment-method.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
