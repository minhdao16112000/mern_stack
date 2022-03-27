import api from '../../api'
import { PAGES_LIST, SET_PAGE } from '../../constants/pageConstant';

//GET ACTIONS BEGIN

export const getPages = () => async (dispatch) => {
    try {
        const res = await api.get("api/page");
        dispatch({ type: PAGES_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getPageSlug = (slug) => async (dispatch) => {
    try {
        const res = await api.get(`api/page/${slug}`);
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getPage = (id) => async (dispatch) => {
    try {
        const res = await api.get("api/page/" + id + "/edit");
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getTrashPages = () => async (dispatch) => {
    try {
        const res = await api.get("api/page/trash");
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}
//GET ACTIONS END

//POST ACTIONS BEGIN
export const storePage = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post("api/page/store", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/pages";
        }
    } catch (e) {
        console.log(e);
    }
}

export const storePageAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post("api/page/store", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
        }
    } catch (e) {
        console.log(e);
    }
}
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deletePages = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/page", { data: ids })
        if (isDeleted) {
            document.location.href = "/admin/pages";
        }
    } catch (e) {
        console.log(e);
    }
}

export const destroyPages = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/page/force", { data: ids })
        if (isDestroy) {
            document.location.href = "/admin/pages/trash";
        }
    } catch (e) {
        console.log(e);
    }
}
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restorePages = (data) => async (dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/page/restore", { data: ids.id.split(',') })
        if (isRestore) {
            document.location.href = "/admin/pages/trash";
        }
    } catch (e) {
        console.log(e);
    }
}

export const activePages = (data) => async (dispatch) => {
    try {
        const isActive = await api.patch("api/page/" + data)
        if (isActive) {
            document.location.href = "/admin/pages";
        }
    } catch (e) {
        console.log(e);
    }
}
//PATCH ACTION END

//PUT ACTION BEGIN
export const updatePage = (page) => async (dispatch) => {
    try {
        const isSucc = await api.put(`api/page/${page.id}`, page);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/pages";
        }
    } catch (e) {
        console.log(e);
    }
}
//PUT ACTION END
