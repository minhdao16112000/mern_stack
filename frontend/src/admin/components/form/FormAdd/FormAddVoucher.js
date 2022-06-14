import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddField from '../../add/AddField';
import SelectField from '../../add/SelectField';
import '../style.scss';
import DatePickerField from '../../add/DatePickerField';
import {
    createVoucher,
    createVoucherAndContinue,
} from '../../../../redux/actions/voucherActions';

const FormAddVoucher = (props) => {
    const dispatch = useDispatch();

    const [save, setSave] = useState('true');

    const initialValues = {
        title: '',
        idCharacter: '',
        quantity: 0,
        type: '',
        discount: 0,
        expire: new Date(),
        min: 0,
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Bạn phải nhập tiêu đề cho mã'),
        idCharacter: Yup.string()
            .min(4, 'Bạn phải nhập đủ 4 ký tự')
            .max(4, 'Tối đa 4 ký tự ')
            .required('Bạn phải nhập ký tự nhận biết cho mã'),
        quantity: Yup.number()
            .min(1, 'Số lượng tối thiểu từ 1')
            .required('Bạn chưa nhập số lượng mã muốn tạo'),
        type: Yup.number().required('Bạn phải chọn loại hình áp dụng'),
        discount: Yup.number()
            .when('type', {
                is: 0,
                then: Yup.number()
                    .min(5, 'Giá trị tối thiểu là 5%')
                    .max(100, 'Giá trị tối đa là 100%'),
            })
            .when('type', {
                is: 1,
                then: Yup.number().min(50000, 'Giá trị tối thiểu là 50.000đ'),
            })
            .required('Bạn phải nhập giá khuyến mãi cho sản phẩm'),
        expire: Yup.date()
            .required('Bạn phải chọn ngày hết hạn của mã')
            .nullable(),
        min: Yup.number()
            .min(100000, 'Giá sản phẩm được giảm tôi thiểu từ 100.000đ')
            .required('Bạn phải nhập giá cho sản phẩm được giảm'),
    });

    useEffect(() => {
        document.title = 'Manage Voucher';
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                const value = {
                    title: values.title,
                    idCharacter: values.idCharacter,
                    quantity: values.quantity,
                    type: values.type,
                    discount: values.discount,
                    expire: values.expire.toLocaleDateString('en-CA'),
                    min: values.min,
                };
                if (save === 'true') {
                    dispatch(createVoucher(value));
                } else {
                    dispatch(createVoucherAndContinue(value));
                    resetForm();
                }
            }}
        >
            {(formikProps) => {
                // eslint-disable-next-line no-unused-vars
                return (
                    <section className="tab-components">
                        <Form>
                            <div className="container-fluid">
                                {/* ========== title-wrapper start ========== */}
                                <div className="title-wrapper pt-30">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="title mb-30">
                                                <h2>Thêm Mã Giảm Giá</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/vouchers`}
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
                                                        // onClick={() =>
                                                        //     setSave('false')
                                                        // }
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
                                                    label="Tiêu Đề"
                                                    name="title"
                                                    component={AddField}
                                                    placeholder="Nhập Tiêu Đề"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Ký Tư Nhận Biết"
                                                    type="text"
                                                    name="idCharacter"
                                                    component={AddField}
                                                    placeholder="Nhập Ký Tư Nhận Biết"
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
                                                    label="Loại Hình Áp Dụng"
                                                    name="type"
                                                    component={SelectField}
                                                    id="type"
                                                    options={[
                                                        {
                                                            value: '',
                                                            label: '----Chọn Loại Hình Áp Dụng----',
                                                        },
                                                        {
                                                            value: 0,
                                                            label: 'Phần trăm',
                                                        },
                                                        {
                                                            value: 1,
                                                            label: 'Trực tiếp',
                                                        },
                                                    ]}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Số Giảm"
                                                    type="number"
                                                    name="discount"
                                                    component={AddField}
                                                    placeholder="Nhập Số Giảm"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Ngày Hết Hạn"
                                                    type="date"
                                                    name="expire"
                                                    data={initialValues.expire}
                                                    component={DatePickerField}
                                                    placeholder="Nhập Ngày Hết Hạn"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Số Tiền Tối Thiểu"
                                                    type="number"
                                                    name="min"
                                                    component={AddField}
                                                    placeholder="Nhập Số Tiền Tối Thiểu"
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

export default FormAddVoucher;
