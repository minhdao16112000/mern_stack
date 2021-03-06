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
            .min('5', 'T??n s???n ph???m t???i thi???u 5 k?? t???')
            .max(100, 'T??n s???n ph???m t???i ??a 100 k?? t???')
            .required('B???n ph???i nh???p t??n s???n ph???m'),
        image: Yup.string().required('B???n ph???i ch???n h??nh ???nh cho s???n ph???m'),
        categoryId: Yup.string().required(
            'B???n ph???i ch???n danh m???c cho s???n ph???m'
        ),
        color: Yup.string().required('B???n ph???i ch???n m??u cho s???n ph???m'),
        size: Yup.string().required('B???n ph???i ch???n size cho s???n ph???m'),
        details: Yup.string().required('B???n ph???i nh???p m?? t??? cho s???n ph???m'),
        price: Yup.number()
            .min(20000, 'Gi?? s???n ph???m t??i thi???u t??? 20.000??')
            .required('B???n ph???i nh???p gi?? cho s???n ph???m'),
        priceDiscount: Yup.number()
            .min(0, 'Gi?? khuy???n m??i kh??ng h???p l???')
            .max(set_product.price, 'Gi?? khuy???n m??i ph???i nh??? h??n gi?? ni??m y???t')
            .required('B???n ph???i nh???p gi?? khuy???n m??i cho s???n ph???m'),
        status: Yup.string().required('B???n ph???i ch???n tr???ng th??i cho s???n ph???m'),
        quantity: Yup.number()
            .min(1, 'S??? l?????ng s???n ph???m t???i thi???u l?? 1')
            .required('B???n ph???i nh???p s??? l?????ng s???n ph???m trong kho'),
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
                    toast.error('Gi?? khuy???n m??i kh??ng ???????c l???n h??n gi?? g???c.', {
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
                                                <h2>Ch???nh S???a S???n Ph???m</h2>
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
                                                        &ensp;Quay L???i Danh S??ch
                                                    </Link>
                                                    &nbsp;
                                                    <button
                                                        type="submit"
                                                        className="main-btn success-btn btn-hover"
                                                    >
                                                        <i className="fas fa-save"></i>
                                                        &ensp;C???p Nh???t
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
                                                    label="T??n S???n Ph???m"
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
                                                    label="Gi??"
                                                    type="number"
                                                    name="price"
                                                    component={AddField}
                                                    value={set_product.price}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Gi?? Gi???m"
                                                    type="number"
                                                    name="priceDiscount"
                                                    component={AddField}
                                                    value={
                                                        set_product.priceDiscount
                                                    }
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="S??? L?????ng"
                                                    type="number"
                                                    name="quantity"
                                                    component={AddField}
                                                    value={set_product.quantity}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Chi Ti???t"
                                                    component={CKEditorField}
                                                    name="details"
                                                    data={set_product.details}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="categoryId"
                                                    label="Danh M???c S???n Ph???m"
                                                    component={MultiSelectField}
                                                    placeholder="Ch???n danh m???c..."
                                                    id="categoryId"
                                                    options={cate}
                                                    data={
                                                        set_product.categoryId
                                                    }
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="color"
                                                    label="M??u S???c"
                                                    component={MultiSelectField}
                                                    placeholder="Ch???n m??u s???c..."
                                                    id="color"
                                                    options={colors}
                                                    data={set_product.color}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="size"
                                                    label="Size"
                                                    component={MultiSelectField}
                                                    placeholder="Ch???n size..."
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
