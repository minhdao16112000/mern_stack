import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from '../../redux/actions/productActions';

const RelatedProducts = (props) => {
    const cate = props.cate;
    const slug = props.slug;
    const listCate = props.listCate;
    const dispatch = useDispatch();
    const lstPro = useSelector((state) => state.product.products_list);

    var relatedPro = [];
    if (lstPro && lstPro.Products) {
        relatedPro = lstPro.Products.filter(
            (value) =>
                value.categoryId === cate &&
                value.slug !== slug &&
                value.status === '1'
        );
    }

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const checkCate = (id) => {
        var catArr = [];
        listCate.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    // const checkSlug = (id) => {
    //     var catArr = [];
    //     var catSlug = '';
    //     listCate.forEach((value) => {
    //         if (id.includes(value._id)) {
    //             catArr.push(value.slug);
    //         }
    //     });
    //     catArr.forEach((value) => {
    //         catSlug += value + '/';
    //     });
    //     return catSlug.slice(0, -1);
    // };

    const checkImage = (key) => {
        let Arr = [];
        relatedPro.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
            // for(let i = 0; i< imageArr.length; i++){
            //     console.log(imageArr[i])
            // }
        });
        return Arr[key];
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="related-products spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Sản Phẩm Liên Quan</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {relatedPro.length !== 0 ? (
                        relatedPro.map((value, key) => {
                            return (
                                <div key={key} className="col-lg-3 col-sm-6">
                                    <Link
                                        to={`/product/${value.slug}`}
                                        onClick={() =>
                                            localStorage.setItem(
                                                'proCate',
                                                value.categoryId
                                            )
                                        }
                                    >
                                        <div className="product-item">
                                            <div className="pi-pic">
                                                <img
                                                    src={`http://localhost:5000/products/${checkImage(
                                                        key
                                                    )}`}
                                                    alt=""
                                                />
                                                {value.priceDiscount !== 0 ? (
                                                    <div className="sale">
                                                        Sale
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )}

                                                <div className="icon">
                                                    <i className="icon_heart_alt"></i>
                                                </div>
                                            </div>
                                            <div className="pi-text">
                                                <div className="catagory-name">
                                                    {checkCate(
                                                        value.categoryId
                                                    )}
                                                </div>
                                                <h5>{value.name}</h5>
                                                {value.priceDiscount !== 0 ? (
                                                    <div className="product-price">
                                                        {formatVND(
                                                            value.priceDiscount
                                                        )}
                                                        <span>
                                                            {' '}
                                                            {formatVND(
                                                                value.price
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="product-price">
                                                        {formatVND(value.price)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <h3 style={{ textAlign: 'center' }}>
                            Không có sản phẩm liên quan{' '}
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
