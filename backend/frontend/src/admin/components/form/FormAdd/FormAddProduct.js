import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../../../../redux/actions/categoryActions';
import {
    getColors,
    getSizes,
    storeProduct,
    storeProductAndContinue,
} from '../../../../redux/actions/productActions';
import AddField from '../../add/AddField';
import CKEditorField from '../../add/CKEditorField';
import ImageField from '../../add/ImageField';
import MultiSelectField from '../../add/MultiSelectField';
import SelectField from '../../add/SelectField';
import '../style.scss';

const FromAddProduct = () => {
    const dispatch = useDispatch();

    const [cate, setCate] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [file, setFile] = useState([]);
    const [save, setSave] = useState('true');

    const lstCate = useSelector((state) => state.category.categories);
    const lstColors = useSelector((state) => state.product.colors_list);
    const lstSizes = useSelector((state) => state.product.sizes_list);

    const initialValues = {
        name: '',
        image: '',
        categoryId: '',
        color: '',
        size: '',
        details: '',
        type: '1',
        price: 0,
        priceDiscount: 0,
        quantity: 0,
        status: '1',
    };

    const setSelectCate = () => {
        if (lstCate && lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                if (value.status === '1') {
                    let objCate = { value: value._id, label: value.name };
                    setCate((oldVal) => [...oldVal, objCate]);
                }
            });
        }
    };

    const setSelectColors = () => {
        if (lstColors && lstColors.Colors) {
            lstColors.Colors.forEach((value) => {
                let objColors = { value: value._id, label: value.name };
                setColors((oldVal) => [...oldVal, objColors]);
            });
        }
    };

    const setSelectSizes = () => {
        if (lstColors && lstColors.Colors) {
            lstSizes.Sizes.forEach((value) => {
                let objSizes = { value: value._id, label: value.name };
                setSizes((oldVal) => [...oldVal, objSizes]);
            });
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min('5', 'Tên sản phẩm tối thiểu 5 kí tự')
            .max(100, 'Tên sản phẩm tối đa 100 kí tự')
            .required('Bạn phải nhập tên sản phẩm'),
        image: Yup.string().required('Bạn phải chọn hình ảnh cho sản phẩm'),
        categoryId: Yup.string().required(
            'Bạn phải chọn danh mục cho sản phẩm'
        ),
        color: Yup.string().required('Bạn phải chọn màu cho sản phẩm'),
        size: Yup.string().required('Bạn phải chọn size cho sản phẩm'),
        details: Yup.string().required('Bạn phải nhập mô tả cho sản phẩm'),
        price: Yup.number()
            .min(20000, 'Giá sản phẩm tôi thiểu từ 20.000đ')
            .required('Bạn phải nhập giá cho sản phẩm'),
        priceDiscount: Yup.number()
            .min(0, 'Giá khuyến mãi không hợp lệ')
            .required('Bạn phải nhập giá khuyến mãi cho sản phẩm'),
        status: Yup.string().required('Bạn phải chọn trạng thái cho sản phẩm'),
        quantity: Yup.number()
            .min(1, 'Số lượng sản phẩm tối thiểu là 1')
            .required('Bạn phải nhập số lượng sản phẩm trong kho'),
    });

    useEffect(() => {
        document.title = 'Manage Products';
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getSizes());

        setSelectCate();
        setSelectColors();
        setSelectSizes();

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const value = {
                    name: values.name,
                    image: values.image,
                    categoryId: values.categoryId,
                    color: values.color,
                    size: values.size,
                    details: values.details,
                    type: values.type,
                    price: values.price,
                    priceDiscount: values.priceDiscount,
                    quantity: values.quantity,
                    status: values.status,
                };
                if (value.price < value.priceDiscount) {
                    toast.error('Giá khuyến mãi không được lớn hơn giá gốc.', {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    const formData = new FormData();
                    for (let i = 0; i < file.length; i++) {
                        formData.append('image', file[i]);
                    }
                    formData.append('infos', JSON.stringify(value));
                    if (save === 'true') {
                        dispatch(storeProduct(formData));
                    } else {
                        dispatch(storeProductAndContinue(formData));
                    }
                }
            }}
        >
            {(formikProps) => {
                // eslint-disable-next-line no-unused-vars
                const { values } = formikProps;
                return (
                    <section className="tab-components">
                        <Form>
                            <div className="container-fluid">
                                {/* ========== title-wrapper start ========== */}
                                <div className="title-wrapper pt-30">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="title mb-30">
                                                <h2>Thêm Sản Phẩm</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/products`}
                                                        className="main-btn active-btn btn-hover"
                                                    >
                                                        <i className="fas fa-chevron-circle-left"></i>
                                                        &ensp;Quay Lại Danh Sách
                                                    </Link>
                                                    &nbsp;
                                                    <button
                                                        type="submit"
                                                        className="main-btn success-btn btn-hover"
                                                        onClick={() =>
                                                            setSave('true')
                                                        }
                                                    >
                                                        <i className="fas fa-save"></i>
                                                        &ensp;Lưu
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                        type="submit"
                                                        className="main-btn info-btn btn-hover"
                                                        onClick={() =>
                                                            setSave('false')
                                                        }
                                                    >
                                                        <i className="far fa-save"></i>
                                                        &ensp;Lưu Và Tiếp Tục
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                {/* ========== title-wrapper end ========== */}
                                {/* ========== form-elements-wrapper start ========== */}
                                <div className="form-elements-wrapper">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <FastField
                                                    label="Tên Sản Phẩm"
                                                    name="name"
                                                    component={AddField}
                                                    placeholder="Nhập Tên Sản Phẩm"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    setFile={setFile}
                                                    name="image"
                                                    id="customFile"
                                                    component={ImageField}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Giá"
                                                    type="number"
                                                    name="price"
                                                    component={AddField}
                                                    placeholder="Nhập Giá Sản Phẩm"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Giá Giảm"
                                                    type="number"
                                                    name="priceDiscount"
                                                    component={AddField}
                                                    placeholder="Nhập Giá Giảm"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Số Lượng"
                                                    type="number"
                                                    name="quantity"
                                                    component={AddField}
                                                    placeholder="Nhập Số Lượng"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Chi tiết"
                                                    component={CKEditorField}
                                                    name="details"
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="categoryId"
                                                    label="Danh Mục Sản Phẩm"
                                                    component={MultiSelectField}
                                                    placeholder="Chọn danh mục sản phẩm..."
                                                    id="categoryId"
                                                    options={cate}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="color"
                                                    label="Màu Sắc"
                                                    component={MultiSelectField}
                                                    placeholder="Chọn màu sắc..."
                                                    id="color"
                                                    options={colors}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="size"
                                                    label="Size"
                                                    component={MultiSelectField}
                                                    placeholder="Chọn size..."
                                                    id="size"
                                                    options={sizes}
                                                />
                                                {/* <div className="input-style-1">
                                                    <label>Size</label>
                                                    <Select closeMenuOnSelect={false} isMulti options={sizes} />
                                                </div> */}
                                                {/* end input */}
                                                <FastField
                                                    name="status"
                                                    label="Trạng Thái"
                                                    component={SelectField}
                                                    placeholder="Chọn trạng Thái"
                                                    id="status"
                                                    options={[
                                                        {
                                                            value: '1',
                                                            label: 'Hiện',
                                                        },
                                                        {
                                                            value: '0',
                                                            label: 'Ẩn',
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            {/* end card */}
                                            {/* ======= input style end ======= */}
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>

                                {/* ========== form-elements-wrapper end ========== */}
                            </div>
                            {/* end container */}
                        </Form>
                    </section>
                );
            }}
        </Formik>
    );
};

export default FromAddProduct;
