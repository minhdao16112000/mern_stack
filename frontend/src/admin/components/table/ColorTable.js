import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    COLOR_DELETE_RESET,
    COLOR_DESTROY_RESET,
    COLOR_RESTORE_RESET,
} from '../../../constants/productConstant';
import {
    getColors,
    getTrashColors,
} from '../../../redux/actions/productActions';
import './style.scss';

const ColorTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const [activePage, setCurrentPage] = useState(1);
    const handelColor = useSelector((state) => state.product);

    const {
        error: errorReviewCreate,
        trash: pushColorToTrash,
        delete: deleteColor,
        restore: restoreColor,
    } = handelColor;

    const indexOfLastTodo = activePage * 5;

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodos = [];
    if (list && list.length !== 0) {
        currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
        if (errorReviewCreate.length !== 0) {
            toast.error(errorReviewCreate);
        }

        if (pushColorToTrash && pushColorToTrash === true) {
            var inputs = document.querySelectorAll('#checkbox-1');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            setItemsChecked([]);
            dispatch(getColors());
            dispatch({ type: COLOR_DELETE_RESET });
        }

        if (deleteColor && deleteColor === true) {
            var inputsTrash = document.querySelectorAll('#checkbox-1');
            for (var j = 0; j < inputsTrash.length; j++) {
                inputsTrash[j].checked = false;
            }
            setItemsChecked([]);
            dispatch(getTrashColors());
            dispatch({ type: COLOR_DESTROY_RESET });
        }

        if (restoreColor && restoreColor === true) {
            var inputTrash = document.querySelectorAll('#checkbox-1');
            for (var k = 0; k < inputTrash.length; k++) {
                inputTrash[k].checked = false;
            }
            setItemsChecked([]);
            dispatch(getTrashColors());
            dispatch({ type: COLOR_RESTORE_RESET });
        }

        props.setDeleteItems(itemsChecked);
    }, [
        deleteColor,
        dispatch,
        errorReviewCreate,
        itemsChecked,
        props,
        pushColorToTrash,
        restoreColor,
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
                                            <h6>Tên Màu</h6>
                                        </th>
                                        <th>
                                            <h6>Mã Màu</h6>
                                        </th>
                                        <th>
                                            <h6>Thời Điểm Tạo</h6>
                                        </th>
                                        {url === '/admin/colors/trash' ? (
                                            <th>
                                                <h6>Thời Điểm Xóa</h6>
                                            </th>
                                        ) : (
                                            <th>
                                                <h6>Chức Năng</h6>
                                            </th>
                                        )}
                                    </tr>
                                    {/*-- end table row--*/}
                                </thead>
                                {currentTodos.length === 0 ? (
                                    <p className="text-center">
                                        Không Có Màu Nào Cả
                                    </p>
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
                                                        <p>{value.name}</p>
                                                    </td>
                                                    <td
                                                        className="min-width"
                                                        style={{
                                                            width: '50px',
                                                        }}
                                                    >
                                                        <div
                                                            className="code-color"
                                                            style={{
                                                                backgroundColor:
                                                                    value.code,
                                                            }}
                                                        >
                                                            {' '}
                                                        </div>
                                                    </td>
                                                    <td className="min-width">
                                                        <p className="color">
                                                            {moment(
                                                                value.createdAt
                                                            )
                                                                .utc()
                                                                .format(
                                                                    'DD-MM-YYYY HH:ss'
                                                                )}
                                                        </p>
                                                    </td>
                                                    {value.deleted === false ? (
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
                                                    ) : (
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

export default ColorTable;
