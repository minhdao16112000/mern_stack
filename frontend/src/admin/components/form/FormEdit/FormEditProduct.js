import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import SelectField from '../../add/SelectField';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../../../../redux/actions/categoryActions';
import {
    getColors,
    getProduct,
    getSizes,
    updateProduct,
} from '../../../../redux/actions/productActions';
import AddField from '../../add/AddField';
import CKEditorField from '../../add/CKEditorField';
import ImageField from '../../add/ImageField';
import MultiSelectField from '../../add/MultiSelectField';
import '../style.scss';

const FromEditProduct = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const [cate, setCate] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [file, setFile] = useState([]);

    const set_product = useSelector((state) => state.product.product);
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
        price: 0,
        priceDiscount: 0,
        quantity: 0,
        status: '1',
    };

    const setSelectCate = () => {
        if (lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                let objCate = { value: value._id, label: value.name };
                setCate((oldVal) => [...oldVal, objCate]);
            });
        }
    };

    const setSelectColors = () => {
        if (lstColors.Colors) {
            lstColors.Colors.forEach((value) => {
                let objColors = { value: value._id, label: value.name };
                setColors((oldVal) => [...oldVal, objColors]);
            });
        }
    };

    const setSelectSizes = () => {
        if (lstSizes.Sizes) {
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
            .max(set_product.price, 'Giá khuyến mãi phải nhỏ hơn giá niêm yết')
            .required('Bạn phải nhập giá khuyến mãi cho sản phẩm'),
        status: Yup.string().required('Bạn phải chọn trạng thái cho sản phẩm'),
        quantity: Yup.number()
            .min(1, 'Số lượng sản phẩm tối thiểu là 1')
            .required('Bạn phải nhập số lượng sản phẩm trong kho'),
    });

    useEffect(() => {
        document.title = 'Manage Products';
        if (id) dispatch(getProduct(id));
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
            enableReinitialize
            initialValues={set_product || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const value = {
                    name: values.name,
                    image: values.image,
                    categoryId: values.categoryId,
                    color: values.color,
                    size: values.size,
                    details: values.details,
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
                    dispatch(
                        updateProduct({
                            formData: formData,
                            id: props.match.params.id,
                        })
                    );
                }
            }}
            // enableReinitialize
        >
            {(formikProps) => {
                return (
                    <section className="tab-components">
                        <Form>
                            <div className="container-fluid">
                                {/* ========== title-wrapper start ========== */}
                                <div className="title-wrapper pt-30">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="title mb-30">
                                                <h2>Chỉnh Sửa Sản Phẩm</h2>
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
                                                    >
                                                        <i className="fas fa-save"></i>
                                                        &ensp;Cập Nhật
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
                                                    value={set_product.name}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    setFile={setFile}
                                                    name="image"
                                                    id="customFile"
                                                    component={ImageField}
                                                    data={set_product.image}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Giá"
                                                    type="number"
                                                    name="price"
                                                    component={AddField}
                                                    value={set_product.price}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Giá Giảm"
                                                    type="number"
                                                    name="priceDiscount"
                                                    component={AddField}
                                                    value={
                                                        set_product.priceDiscount
                                                    }
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Số Lượng"
                                                    type="number"
                                                    name="quantity"
                                                    component={AddField}
                                                    value={set_product.quantity}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Chi Tiết"
                                                    component={CKEditorField}
                                                    name="details"
                                                    data={set_product.details}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="categoryId"
                                                    label="Danh Mục Sản Phẩm"
                                                    component={MultiSelectField}
                                                    placeholder="Chọn danh mục..."
                                                    id="categoryId"
                                                    options={cate}
                                                    data={
                                                        set_product.categoryId
                                                    }
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="color"
                                                    label="Màu Sắc"
                                                    component={MultiSelectField}
                                                    placeholder="Chọn màu sắc..."
                                                    id="color"
                                                    options={colors}
                                                    data={set_product.color}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="size"
                                                    label="Size"
                                                    component={MultiSelectField}
                                                    placeholder="Chọn size..."
                                                    id="size"
                                                    options={sizes}
                                                    data={set_product.size}
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

export default FromEditProduct;
