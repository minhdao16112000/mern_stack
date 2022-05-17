/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import './menuleft.scss';

const MenuLeft = (props) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var arrCate = [];
    var [typeCate, setTypeCate] = useState();
    var [actCate, setActCat] = useState();
    var [childCate, setChildCate] = useState(arrCate);
    var [grandChildCate, setGrandChildCate] = useState(null);
    const [isOpen, setOpen] = useState(false);
    var [count, setCount] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const lstCate = props.listCate;
    const lstColor = props.listColor;
    const lstSize = props.listSize;
    const product = useSelector((state) => state.product.product);
    let match = useRouteMatch('/category/:slug');
    let match2 = useRouteMatch('/product/:slug');

    const checkSlug = (id) => {
        var catArr = [];
        if (id && lstCate) {
            lstCate.forEach((value) => {
                if (id.includes(value._id)) {
                    catArr.push(value.slug);
                }
            });
        }
        return catArr[0];
    };

    var slugCate = match
        ? match.params.slug
        : match2
        ? checkSlug(localStorage.getItem('proCate'))
        : '';

    var lstParentCate = [];

    if (lstCate) {
        lstParentCate = lstCate.filter(
            (value) => value.parentCate === '' && value.status === '1'
        );
    }

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

    const toggleDropdown = (key, data) => {
        getGrandChild(data._id, typeCate);
        setOpen(!isOpen);
        setCount(key);
        // setItem(grandChildCate)
    };

    const handleItemClick = (id) => {
        selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
    };

    useEffect(() => {
        var arrActCate = '';
        var idCate = '';
        lstParentCate.forEach((value) => {
            if (value.slug === slugCate) {
                arrActCate = value.name;
                idCate = value._id;
                setTypeCate(value.type);
            }
        });
        if (lstCate) {
            lstCate.forEach((value) => {
                if (
                    value.parentCate.includes(idCate) &&
                    value.deleted === false &&
                    value.status === '1'
                ) {
                    arrCate.push(value);
                }
            });
        }
        setActCat(arrActCate);
    }, [lstParentCate, lstCate]);

    return (
        <>
            <div className="filter-widget">
                <h4 className="fw-title">Danh Mục</h4>
                <ul className="filter-catagories">
                    {lstParentCate.map((cate, key) => {
                        if (cate.slug !== slugCate) {
                            return (
                                <li key={key}>
                                    <Link to={`/category/${cate.slug}`}>
                                        {cate.name}
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
            <div className="filter-widget">
                <h4 className="fw-title">{actCate}</h4>
                <div className="dropdown cate-child">
                    {actCate ? (
                        childCate.map((value, key) => {
                            // var ddmenu = key + 1;
                            return (
                                <div key={key}>
                                    <div
                                        className="dropdown-header cate-name"
                                        onClick={() =>
                                            toggleDropdown(key, value)
                                        }
                                    >
                                        {value.name}
                                    </div>
                                    {key === count ? (
                                        <div
                                            className={`dropdown-body ${
                                                isOpen && 'open'
                                            }`}
                                        >
                                            {grandChildCate !== null ? (
                                                grandChildCate.length > 0 ? (
                                                    grandChildCate.map(
                                                        (item, key) => (
                                                            <div
                                                                className="dropdown-item"
                                                                onClick={(e) =>
                                                                    handleItemClick(
                                                                        e.target
                                                                            .id
                                                                    )
                                                                }
                                                                key={key}
                                                            >
                                                                <span
                                                                    className={`dropdown-item-dot ${
                                                                        item.id ===
                                                                            selectedItem &&
                                                                        'selected'
                                                                    }`}
                                                                >
                                                                    •{' '}
                                                                </span>
                                                                <Link
                                                                    className="grandChildCate"
                                                                    to={`/category/${slugCate}/${value.slug}/${item.slug}`}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <Redirect
                                                        to={`/category/${slugCate}/${value.slug}`}
                                                    />
                                                )
                                            ) : null}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            {match || match2 ? (
                <>
                    <div className="filter-widget">
                        <h4 className="fw-title">Size</h4>
                        <div className="fw-size-choose">
                            {lstSize && lstSize.length !== 0 ? (
                                lstSize.slice(0, 4).map((value, key) => {
                                    if (value.deleted === false) {
                                        return (
                                            <div key={key} className="sc-item">
                                                <Link
                                                    to={`/category/${slugCate}/size/${value.slug}`}
                                                >
                                                    <label htmlFor="s-size">
                                                        {value.name}
                                                    </label>
                                                </Link>
                                            </div>
                                        );
                                    }
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="filter-widget">
                        <h4 className="fw-title">Màu</h4>
                        <div className="fw-color-choose">
                            {lstColor && lstColor.length !== 0 ? (
                                lstColor.slice(0, 12).map((value, key) => {
                                    if (value.deleted === false) {
                                        return (
                                            <div key={key} className="cs-item">
                                                <Link
                                                    to={`/category/${slugCate}/color/${value.slug}`}
                                                >
                                                    <div
                                                        className="circle"
                                                        style={{
                                                            background:
                                                                value.code,
                                                        }}
                                                    ></div>
                                                    <div className="name-color">
                                                        {value.name}
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    }
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default MenuLeft;
