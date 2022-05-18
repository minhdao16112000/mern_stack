import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    PAGE_DELETE_RESET,
    PAGE_DESTROY_RESET,
    PAGE_RESTORE_RESET,
    PAGE_STATUS_RESET,
} from '../../../constants/pageConstant';
import {
    activePages,
    getPages,
    getTrashPages,
} from '../../../redux/actions/pageActions';
import './style.scss';

const PageTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const [activePage, setCurrentPage] = useState(1);

    const handelPage = useSelector((state) => state.page);

    const {
        error: errorHandle,
        active: activePagesShop,
        trash: pushPageToTrash,
        delete: deletePage,
        restore: restorePage,
    } = handelPage;

    const indexOfLastTodo = activePage * 5;

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodo = [];
    if (list && list.length !== 0) {
        currentTodo = list.slice(indexOfFirstTodo, indexOfLastTodo);
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
        if (errorHandle && errorHandle.length !== 0) {
            toast.error(errorHandle);
        }

        if (activePagesShop && activePagesShop === true) {
            dispatch(getPages());
            dispatch({ type: PAGE_STATUS_RESET });
        }

        if (pushPageToTrash && pushPageToTrash === true) {
            var inputs = document.querySelectorAll('#checkbox-1');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            setItemsChecked([]);
            dispatch(getPages());
            dispatch({ type: PAGE_DELETE_RESET });
        }

        if (deletePage && deletePage === true) {
            var inputsTrash = document.querySelectorAll('#checkbox-1');
            for (var j = 0; j < inputsTrash.length; j++) {
                inputsTrash[j].checked = false;
            }
            setItemsChecked([]);
            dispatch(getTrashPages());
            dispatch({ type: PAGE_DESTROY_RESET });
        }

        if (restorePage && restorePage === true) {
            var inputTrash = document.querySelectorAll('#checkbox-1');
            for (var k = 0; k < inputTrash.length; k++) {
                inputTrash[k].checked = false;
            }
            setItemsChecked([]);
            dispatch(getTrashPages());
            dispatch({ type: PAGE_RESTORE_RESET });
        }

        props.setDeleteItems(itemsChecked);
    }, [
        activePagesShop,
        deletePage,
        dispatch,
        errorHandle,
        itemsChecked,
        props,
        pushPageToTrash,
        restorePage,
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
                                            <h6>Nội Dung</h6>
                                        </th>
                                        <th>
                                            <h6>Người Tạo</h6>
                                        </th>
                                        {url === '/admin/pages/trash' ? (
                                            <th>
                                                <h6>Thời Điểm Xóa</h6>
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
                                {currentTodo.length === 0 ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan={10}>
                                                <h3 className="text-center">
                                                    Không Có Bài Viết Nào Của
                                                    Shop
                                                </h3>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {currentTodo.map((value, key) => {
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
                                                                                    activePages(
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
                                                                            onClick={activePages(
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

export default PageTable;
