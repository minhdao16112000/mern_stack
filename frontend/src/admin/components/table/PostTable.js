import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    POST_DELETE_RESET,
    POST_DESTROY_RESET,
    POST_RESTORE_RESET,
    POST_STATUS_RESET,
} from '../../../constants/postConstant';
import {
    activePosts,
    getPosts,
    getTrashPosts,
} from '../../../redux/actions/postActions';
import './style.scss';

const PostTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const lstTopic = useSelector((state) => state.topic.topics);
    const [activePage, setCurrentPage] = useState(1);

    const handelPost = useSelector((state) => state.post);

    const {
        error: errorHandle,
        active: activePost,
        trash: pushPostToTrash,
        delete: deletePost,
        restore: restorePost,
    } = handelPost;

    const indexOfLastTodo = activePage * 5;

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodos = [];
    if (list && list.length !== 0) {
        currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const checkTopic = (id) => {
        var topicArr = [];
        if (lstTopic.Topics) {
            lstTopic.Topics.forEach((value) => {
                if (id.includes(value._id)) {
                    topicArr.push(value.name);
                }
            });
        }
        return <p>{topicArr.toString()}</p>;
    };

    const isChecked = (e, id) => {
        const checked = e.target.checked;
        if (checked) {
            setItemsChecked((oldval) => [...oldval, id]);
        } else {
            setItemsChecked(
                itemsChecked.filter((item) => {
                    return item !== id;
                })
            );
        }
    };

    useEffect(() => {
        if (errorHandle && errorHandle.length !== 0) {
            toast.error(errorHandle);
        }

        if (activePost && activePost === true) {
            dispatch(getPosts());
            dispatch({ type: POST_STATUS_RESET });
        }

        if (pushPostToTrash && pushPostToTrash === true) {
            var inputs = document.querySelectorAll('#checkbox-1');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            setItemsChecked([]);
            dispatch(getPosts());
            dispatch({ type: POST_DELETE_RESET });
        }

        if (deletePost && deletePost === true) {
            var inputsTrash = document.querySelectorAll('#checkbox-1');
            for (var j = 0; j < inputsTrash.length; j++) {
                inputsTrash[j].checked = false;
            }
            setItemsChecked([]);
            dispatch(getTrashPosts());
            dispatch({ type: POST_DESTROY_RESET });
        }

        if (restorePost && restorePost === true) {
            var inputTrash = document.querySelectorAll('#checkbox-1');
            for (var k = 0; k < inputTrash.length; k++) {
                inputTrash[k].checked = false;
            }
            setItemsChecked([]);
            dispatch(getTrashPosts());
            dispatch({ type: POST_RESTORE_RESET });
        }

        props.setDeleteItems(itemsChecked);
    }, [
        activePost,
        deletePost,
        dispatch,
        errorHandle,
        itemsChecked,
        props,
        pushPostToTrash,
        restorePost,
    ]);

    return (
        <div className="tables-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-style mb-30">
                        <div className="table-wrapper table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            <h6>#</h6>
                                        </th>
                                        <th>
                                            <h6>Tiêu Đề</h6>
                                        </th>
                                        <th>
                                            <h6>Hình Ảnh</h6>
                                        </th>
                                        <th>
                                            <h6>Chủ Đề</h6>
                                        </th>
                                        <th>
                                            <h6>Mô Tả Ngắn</h6>
                                        </th>
                                        <th>
                                            <h6>Nội Dung</h6>
                                        </th>
                                        <th>
                                            <h6>Người Tạo</h6>
                                        </th>
                                        <th>
                                            <h6>Người Cập Nhật</h6>
                                        </th>
                                        {url === '/admin/posts/trash' ? (
                                            <th>
                                                <h6>Thời Điểm Tạo</h6>
                                            </th>
                                        ) : (
                                            <>
                                                <th>
                                                    <h6>Trạng Thái</h6>
                                                </th>
                                                <th>
                                                    <h6>Chức Năng</h6>
                                                </th>
                                            </>
                                        )}
                                    </tr>
                                    {/*-- end table row--*/}
                                </thead>
                                {currentTodos.length === 0 ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan={10}>
                                                <h3 className="text-center">
                                                    Không Có Tin Tức Nào
                                                </h3>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {currentTodos.map((value, key) => {
                                            return (
                                                <tr key={key} id={value._id}>
                                                    <td>
                                                        <div className="check-input-primary">
                                                            <input
                                                                className="form-check-input check-admin"
                                                                type="checkbox"
                                                                id="checkbox-1"
                                                                onClick={(e) =>
                                                                    isChecked(
                                                                        e,
                                                                        value._id
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.title}</p>
                                                    </td>
                                                    <td className="min-width th-admin">
                                                        <img
                                                            src={`http://localhost:5000/posts/${value.image}`}
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td className="min-width">
                                                        {checkTopic(
                                                            value.topicId
                                                        )}
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {value.summary.substring(
                                                                0,
                                                                50
                                                            ) + '...'}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {value.content.substring(
                                                                0,
                                                                100
                                                            ) + '...'}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.createdBy}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.updatedBy}</p>
                                                    </td>
                                                    {value.deleted === false ? (
                                                        <>
                                                            <td>
                                                                <div className="action">
                                                                    {value.status ===
                                                                    '1' ? (
                                                                        <button
                                                                            className="text-success"
                                                                            onClick={() =>
                                                                                dispatch(
                                                                                    activePosts(
                                                                                        value._id
                                                                                    )
                                                                                )
                                                                            }
                                                                            title="Show"
                                                                        >
                                                                            <i className="far fa-eye"></i>
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            className="text-danger"
                                                                            onClick={activePosts(
                                                                                value._id
                                                                            )}
                                                                            title="Hidden"
                                                                        >
                                                                            <i className="far fa-eye-slash"></i>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="action">
                                                                    <Link
                                                                        to={`${url}/${value._id}`}
                                                                        className="text-primary"
                                                                        title="Edit"
                                                                    >
                                                                        <i className="fas fa-pen-square"></i>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="min-width">
                                                                <p>
                                                                    {moment(
                                                                        value.deletedAt
                                                                    )
                                                                        .utc()
                                                                        .format(
                                                                            'DD-MM-YYYY HH:ss'
                                                                        )}
                                                                </p>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                        {/*-- end table row --*/}
                                    </tbody>
                                )}
                            </table>
                            {/*-- end table --*/}
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={list ? list.length : 0}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                    {/*-- end card --*/}
                </div>
                {/*-- end col --*/}
            </div>
            {/*-- end row --*/}
        </div>
    );
};

export default PostTable;
