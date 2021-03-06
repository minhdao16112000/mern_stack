import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { getPost, updatePost } from '../../../../redux/actions/postActions';
import { getProducts } from '../../../../redux/actions/productActions';
import { getTopics } from '../../../../redux/actions/topicActions';
import AddField from '../../add/AddField';
import CKEditorField from '../../add/CKEditorField';
import ImageField from '../../add/ImageField';
import MultiSelectField from '../../add/MultiSelectField';
import SelectField from '../../add/SelectField';
import '../style.scss';

const FormEditPost = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const [topic, setTopic] = useState([]);
    const [product, setProduct] = useState([]);
    const [file, setFile] = useState([]);

    const set_post = useSelector((state) => state.post.post);
    const lstTopic = useSelector((state) => state.topic.topics);
    const lstPro = useSelector((state) => state.product.products_list);

    const initialValues = {
        title: '',
        image: '',
        topicId: '',
        productId: '',
        summary: '',
        content: '',
        type: '1',
        updatedBy: '',
        status: '1',
    };

    const setSelectTopic = () => {
        if (lstTopic && lstTopic.Topics) {
            lstTopic.Topics.forEach((value) => {
                let objTopic = { value: value._id, label: value.name };
                setTopic((oldVal) => [...oldVal, objTopic]);
            });
        }
    };

    const setSelectPro = () => {
        if (lstPro && lstPro.Products) {
            lstPro.Products.forEach((value) => {
                if (value.status === '1') {
                    let objPro = { value: value._id, label: value.name };
                    setProduct((oldVal) => [...oldVal, objPro]);
                }
            });
        }
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(5, 'T??n b??i vi???t t???i thi???u 5 k?? t???')
            .required('B???n ph???i nh???p t??n b??i vi???t'),
        image: Yup.string().required('B???n ph???i ch???n h??nh ???nh cho b??i vi???t'),
        topicId: Yup.string().required('B???n ph???i ch???n ch??? ????? cho b??i vi???t'),
        productId: Yup.string().required(
            'B???n ph???i ch???n s???n ph???m li??n quan cho b??i vi???t'
        ),
        summary: Yup.string()
            .min(15, 'M?? t??? ng???n c???a b??i vi???t t???i thi???u 15 k?? t???')
            .max(1000, 'M?? t??? ng???n c???a b??i vi???t t???i ??a 1000 k?? t???')
            .required('B???n ph???i nh???p m?? t??? ng???n cho b??i vi???t'),
        content: Yup.string()
            .min(2000, 'N???i dung c???a b??i vi???t t???i thi???u 2000 k?? t???')
            .required('B???n ph???i nh???p n???i dung cho b??i vi???t'),
        updatedBy: Yup.string().required(
            'B???n ph???i nh???p t??n ng?????i s???a b??i vi???t'
        ),
        status: Yup.string().required('B???n ph???i ch???n tr???ng th??i cho b??i vi???t'),
    });

    useEffect(() => {
        document.title = 'Manage Posts';

        if (id) dispatch(getPost(id));
        dispatch(getTopics());
        dispatch(getProducts());

        setSelectTopic();
        setSelectPro();

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            enableReinitialize
            initialValues={set_post || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const value = {
                    title: values.title,
                    image: values.image,
                    topicId: values.topicId,
                    productId: values.productId,
                    summary: values.summary,
                    content: values.content,
                    type: values.type,
                    createdBy: values.createdBy,
                    updatedBy: values.updatedBy,
                    status: values.status,
                };
                const formData = new FormData();
                for (let i = 0; i < file.length; i++) {
                    formData.append('image', file[i]);
                }
                formData.append('infos', JSON.stringify(value));
                dispatch(
                    updatePost({
                        formData: formData,
                        id: props.match.params.id,
                    })
                );
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
                                                <h2>Ch???nh S???a Tin T???c</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/posts`}
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
                                                    label="Ti??u ?????"
                                                    name="title"
                                                    component={AddField}
                                                    value={set_post.title}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    setFile={setFile}
                                                    name="image"
                                                    id="customFile"
                                                    component={ImageField}
                                                    data={set_post.image}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="M?? T??? Ng???n"
                                                    component={CKEditorField}
                                                    name="summary"
                                                    data={set_post.summary}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="N???i Dung"
                                                    component={CKEditorField}
                                                    name="content"
                                                    data={set_post.content}
                                                />

                                                {/* end input */}
                                                <Field
                                                    name="topicId"
                                                    label="Ch??? ?????"
                                                    component={SelectField}
                                                    placeholder="Ch???n ch??? ?????..."
                                                    id="topicId"
                                                    options={topic}
                                                    data={set_post.topicId}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="productId"
                                                    label="S???n Ph???m Li??n Quan"
                                                    component={MultiSelectField}
                                                    placeholder="Ch???n s???n ph???m li??n quan..."
                                                    id="productId"
                                                    options={product}
                                                    data={set_post.productId}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Ng?????i C???p Nh???t"
                                                    name="updatedBy"
                                                    component={AddField}
                                                />
                                                {/* end input */}
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

export default FormEditPost;
