import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './nav.scss';

const Nav = (props) => {
    var [childCate, setChildCate] = useState([]);
    var [grandChildCate, setGrandChildCate] = useState([]);
    const lstCate = props.listCate;
    const lstParentCate = lstCate.filter((value) => value.parentCate === '');

    const getChild = (id) => {
        setChildCate([]);
        lstCate.forEach((value, key) => {
            if (value.deleted === false && value.status === '1') {
                if (value.parentCate.includes(id)) {
                    setChildCate((oldVal) => [...oldVal, value]);
                }
            }
        });
    };
    const getGrandChild = (id, parentType) => {
        setGrandChildCate([]);
        lstCate.forEach((value, key) => {
            if (value.deleted === false && value.status === '1') {
                if (value.parentCate.includes(id)) {
                    if (value.type === parentType || value.type === '0') {
                        setGrandChildCate((oldVal) => [...oldVal, value]);
                    } else if (
                        value.type === '4' &&
                        (parentType === '1' || parentType === '2')
                    ) {
                        setGrandChildCate((oldVal) => [...oldVal, value]);
                    } else if (
                        value.type === '5' &&
                        (parentType === '2' || parentType === '3')
                    ) {
                        setGrandChildCate((oldVal) => [...oldVal, value]);
                    }
                }
            }
        });
    };
    useEffect(() => {}, []);
    const role = useSelector((state) => state.user.isAdmin);
    return (
        <div className="nav-item">
            <div className="container">
                <div className="nav-depart">
                    <div className="depart-btn">
                        <i className="ti-menu"></i>
                        <span>Danh mục sản phẩm</span>
                        <ul className="depart-hover">
                            {lstParentCate.map((cate, key) => {
                                return (
                                    <li
                                        key={key}
                                        onMouseEnter={() => {
                                            getChild(cate._id);
                                        }}
                                    >
                                        <Link to={`/category/${cate.slug}`}>
                                            {cate.name}
                                        </Link>
                                        <ul className="depart-hover sub-menu">
                                            {childCate !== undefined
                                                ? childCate.map(
                                                      (value, key) => {
                                                          return (
                                                              <li
                                                                  key={key}
                                                                  onMouseEnter={() =>
                                                                      getGrandChild(
                                                                          value._id,
                                                                          cate.type
                                                                      )
                                                                  }
                                                              >
                                                                  <Link
                                                                      to={`/category/${cate.slug}/${value.slug}`}
                                                                  >
                                                                      {
                                                                          value.name
                                                                      }
                                                                  </Link>
                                                                  <ul className="depart-hover sub-menu">
                                                                      {grandChildCate !==
                                                                      undefined
                                                                          ? grandChildCate.map(
                                                                                (
                                                                                    index,
                                                                                    key
                                                                                ) => {
                                                                                    return (
                                                                                        <li
                                                                                            key={
                                                                                                key
                                                                                            }
                                                                                        >
                                                                                            <Link
                                                                                                to={`/category/${cate.slug}/${value.slug}/${index.slug}`}
                                                                                            >
                                                                                                {
                                                                                                    index.name
                                                                                                }
                                                                                            </Link>
                                                                                        </li>
                                                                                    );
                                                                                }
                                                                            )
                                                                          : null}
                                                                      ;
                                                                  </ul>
                                                              </li>
                                                          );
                                                      }
                                                  )
                                                : null}
                                            ;
                                        </ul>
                                    </li>
                                );
                            })}
                            ;
                        </ul>
                    </div>
                </div>
                <nav className="nav-menu mobile-menu">
                    <ul>
                        <li className="active">
                            <a href="/">Trang chủ</a>
                        </li>
                        <li>
                            <Link to="/tin-tuc">Tin tức</Link>
                        </li>
                        <li>
                            <Link to="/lien-he">Liên hệ</Link>
                        </li>
                        <li>
                            <a href="/#">Trang khác</a>
                            <ul className="dropdown">
                                <li>
                                    <Link to="/xem-gio-hang">Giỏ hàng</Link>
                                </li>
                                <li>
                                    <Link to="/xem-gio-hang/check-out">
                                        Thanh toán
                                    </Link>
                                </li>
                                {JSON.parse(
                                    localStorage.getItem('userInfo')
                                ) !== null ? (
                                    <li>
                                        <Link to="/lich-su-mua-hang">
                                            Lịch sử mua hàng
                                        </Link>
                                    </li>
                                ) : null}
                                {JSON.parse(
                                    localStorage.getItem('userInfo')
                                ) === null ? (
                                    <li>
                                        <Link to="/dang-ky">Đăng ký</Link>
                                    </li>
                                ) : null}
                                {JSON.parse(
                                    localStorage.getItem('userInfo')
                                ) === null ? (
                                    <li>
                                        <Link to="/dang-nhap">Đăng nhập</Link>
                                    </li>
                                ) : null}
                                {/* {JSON.parse(localStorage.getItem("userInfo")) !== null ? (
                                <li>
                                    <Link to="/login">Dashboard</Link>
                                </li>
                                ) : null} */}
                                {role === 0 ? (
                                    <li>
                                        <Link to="/admin">Trang quản trị</Link>
                                    </li>
                                ) : null}
                            </ul>
                        </li>
                        {JSON.parse(localStorage.getItem('userInfo')) !==
                        null ? (
                            <li>
                                <Link to="/logout">Đăng xuất</Link>
                            </li>
                        ) : null}
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>
    );
};

export default Nav;
