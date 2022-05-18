import { toast } from 'react-toastify';
import api from '../../api';
import {
    PRODUCTS_LIST,
    COLORS_LIST,
    SIZES_LIST,
    SET_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    PRODUCTS_SEARCH,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_MARK_ALL_REQUEST,
    PRODUCT_MARK_ALL_SUCCESS,
    PRODUCT_MARK_ALL_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DESTROY_REQUEST,
    PRODUCT_DESTROY_SUCCESS,
    PRODUCT_RESTORE_REQUEST,
    PRODUCT_RESTORE_SUCCESS,
    PRODUCT_RESTORE_FAIL,
    PRODUCT_STATUS_REQUEST,
    PRODUCT_STATUS_SUCCESS,
    PRODUCT_STATUS_FAIL,
    COLOR_DELETE_REQUEST,
    COLOR_DELETE_SUCCESS,
    COLOR_DELETE_FAIL,
    COLOR_DESTROY_REQUEST,
    COLOR_DESTROY_SUCCESS,
    PRODUCT_DESTROY_FAIL,
    COLOR_DESTROY_FAIL,
    COLOR_RESTORE_REQUEST,
    COLOR_RESTORE_SUCCESS,
    COLOR_RESTORE_FAIL,
    SIZE_DELETE_REQUEST,
    SIZE_DELETE_SUCCESS,
    SIZE_DELETE_FAIL,
    SIZE_DESTROY_REQUEST,
    SIZE_DESTROY_SUCCESS,
    SIZE_DESTROY_FAIL,
    SIZE_RESTORE_REQUEST,
    SIZE_RESTORE_SUCCESS,
    SIZE_RESTORE_FAIL,
} from '../../constants/productConstant';

//GET ACTIONS BEGIN

export const getProducts = () => async (dispatch) => {
    try {
        const res = await api.get('api/product');
        dispatch({ type: PRODUCTS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getSearch = (search) => async (dispatch) => {
    try {
        const res = await api.get(`api/product/search?key=${search.trim()}`);
        dispatch({ type: PRODUCTS_SEARCH, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getColors = () => async (dispatch) => {
    try {
        const res = await api.get('api/color');
        dispatch({ type: COLORS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getSizes = () => async (dispatch) => {
    try {
        const res = await api.get('api/size');
        dispatch({ type: SIZES_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getProduct = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/product/' + id + '/edit');
        dispatch({ type: SET_PRODUCT, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getProductBySlug = (slug) => async (dispatch) => {
    try {
        const res = await api.get('api/product/' + slug);
        dispatch({ type: SET_PRODUCT, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getColor = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/color/' + id + '/edit');
        dispatch({ type: SET_COLOR, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getSize = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/size/' + id + '/edit');
        dispatch({ type: SET_SIZE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashColors = () => async (dispatch) => {
    try {
        const res = await api.get('api/color/trash');
        dispatch({ type: COLORS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashProducts = () => async (dispatch) => {
    try {
        const res = await api.get('api/product/trash');
        dispatch({ type: PRODUCTS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashSizes = () => async (dispatch) => {
    try {
        const res = await api.get('api/size/trash');
        dispatch({ type: SIZES_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//POST ACTIONS BEGIN
export const storeProduct = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/product/store', data);
        if (isSucc) {
            document.location.href = '/admin/products';
            toast.success('Thêm sản phẩm thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storeProductAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/product/store', data);
        if (isSucc) {
            toast.success('Thêm sản phẩm thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storeColor = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/color/store', data);
        if (isSucc) {
            document.location.href = '/admin/colors';
            toast.success('Thêm màu thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storeColorAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/color/store', data);
        if (isSucc) {
            toast.success('Thêm màu thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storeSize = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/size/store', data);
        if (isSucc) {
            document.location.href = '/admin/sizes';
            toast.success('Thêm size thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const storeSizeAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post('api/size/store', data);
        if (isSucc) {
            toast.success('Thêm size thành công !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const postImgProduct = (data) => async (dispatch) => {
    try {
        await api.post('api/product/imageProduct', data);
    } catch (e) {
        console.log(e);
    }
};

export const createReview = (productId, review) => async (dispatch) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    try {
        const { data } = await api.post(
            `/api/product/${productId}/reviews`,
            review
        );
        dispatch({
            type: PRODUCT_REVIEW_CREATE_SUCCESS,
            payload: data.review,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deleteProducts = (data) => async (dispatch) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/product', { data: ids });
        if (isDeleted) {
            toast.success('Sản phẩm đã được đưa vào thùng rác !');
            dispatch({
                type: PRODUCT_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
};

export const deleteColors = (data) => async (dispatch) => {
    dispatch({ type: COLOR_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/color', { data: ids });
        if (isDeleted) {
            toast.success('Màu đã được đưa vào thùng rác !');
            dispatch({
                type: COLOR_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: COLOR_DELETE_FAIL, payload: message });
    }
};

export const deleteSizes = (data) => async (dispatch) => {
    dispatch({ type: SIZE_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/size', { data: ids });
        if (isDeleted) {
            toast.success('Size đã được đưa vào thùng rác !');
            dispatch({
                type: SIZE_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SIZE_DELETE_FAIL, payload: message });
    }
};

export const destroyProducts = (data) => async (dispatch) => {
    dispatch({ type: PRODUCT_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/product/force', { data: ids });
        if (isDestroy) {
            toast.success('Sản phẩm đã được xóa hoàn toàn !');
            dispatch({
                type: PRODUCT_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_DESTROY_FAIL, payload: message });
    }
};

export const destroyColors = (data) => async (dispatch) => {
    dispatch({ type: COLOR_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/color/force', { data: ids });
        if (isDestroy) {
            toast.success('Màu đã được xóa hoàn toàn !');
            dispatch({
                type: COLOR_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: COLOR_DESTROY_FAIL, payload: message });
    }
};

export const destroySizes = (data) => async (dispatch) => {
    dispatch({ type: SIZE_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/size/force', { data: ids });
        if (isDestroy) {
            toast.success('Size đã được xóa hoàn toàn !');
            dispatch({
                type: SIZE_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SIZE_DESTROY_FAIL, payload: message });
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restoreProducts = (data) => async (dispatch) => {
    dispatch({ type: PRODUCT_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/product/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Sản phẩm đã được phục hồi !');
            dispatch({
                type: PRODUCT_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_RESTORE_FAIL, payload: message });
    }
};

export const restoreColors = (data) => async (dispatch) => {
    dispatch({ type: COLOR_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/color/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Màu đã được phục hồi !');
            dispatch({
                type: COLOR_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: COLOR_RESTORE_FAIL, payload: message });
    }
};

export const restoreSizes = (data) => async (dispatch) => {
    dispatch({ type: SIZE_RESTORE_REQUEST });
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/size/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            toast.success('Size đã được phục hồi !');
            dispatch({
                type: SIZE_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SIZE_RESTORE_FAIL, payload: message });
    }
};

export const activeProducts = (data) => async (dispatch) => {
    dispatch({ type: PRODUCT_STATUS_REQUEST });
    try {
        const isActive = await api.patch('api/product/' + data);
        if (isActive) {
            toast.success('Thay đổi trạng thái thành công !');
            dispatch({
                type: PRODUCT_STATUS_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_STATUS_FAIL, payload: message });
    }
};

export const markAllProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCT_MARK_ALL_REQUEST });
    try {
        const data = await api.patch('api/product/mark-all');
        dispatch({
            type: PRODUCT_MARK_ALL_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_MARK_ALL_FAIL, payload: message });
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updateProduct = (product) => async (dispatch) => {
    try {
        const isSucc = await api.put(
            `api/product/${product.id}`,
            product.formData
        );
        if (isSucc) {
            document.location.href = '/admin/products';
            toast.success('Cập nhật sản phẩm thành cônng !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateColor = (color) => async (dispatch) => {
    try {
        const data = await api.put(`api/color/${color.id}`, color);
        if (data) {
            document.location.href = '/admin/colors';
            toast.success('Cập nhật màu thành cônng !');
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateSize = (size) => async (dispatch) => {
    try {
        const data = await api.put(`api/size/${size.id}`, size);
        if (data) {
            document.location.href = '/admin/sizes';
            toast.success('Cập nhật size thành cônng !');
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
