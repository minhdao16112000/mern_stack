import api from '../../api'
import {
    TOPIC_LIST,
    SET_TOPIC
} from "../../constants/topicConstant";

//GET ACTIONS BEGIN
export const getTopics = () => async (dispatch) => {
    try {
        const res = await api.get("api/topic");
        dispatch({ type:TOPIC_LIST, payload: res.data})
    } catch (e) {
        console.log(e);
    }
}

export const getTopic = (id) => async (dispatch) => {
    try {
        const res = await api.get("api/topic/"+ id + "/edit");
        dispatch({ type: SET_TOPIC, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getTrashTopics = () => async (dispatch) => {
    try {
        const res = await api.get("api/topic/trash");
        dispatch({ type: TOPIC_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}
//GET ACTIONS END

//POST ACTIONS BEGIN
export const storeTopic = (data) => async (dispatch) => {
    try {
        const isSuccess = await api.post("api/topic/store", data);
        if (isSuccess) {
            console.log(isSuccess.data);
            console.log("success");
            document.location.href = "/admin/topics";
        }
    } catch (e) {
        console.log(e);
    }
}

export const storeTopicAndContinue = (data) => async (dispatch) => {
    try {
        const isSuccess = await api.post("api/topic/store", data);
        if (isSuccess) {
            console.log("success");
        }
    } catch (e) {
        console.log(e);
    }
}

export const postImgTopic = (data) => async (dispatch) => {
    try {
        await api.post("api/topic/imageCategory", data);
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deleteTopics = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/topic", { data: ids })
        if (isDeleted) {
            document.location.href = "/admin/topics";
        }
    } catch (e) {
        console.log(e);
    }
}

export const destroyTopics = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/topic/force", { data: ids })
        if (isDestroy) {
            document.location.href = "/admin/topics/trash";
        }
    } catch (e) {
        console.log(e);
    }
}
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restoreTopics = (data) => async (dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/topic/restore", { data: ids.id.split(',') })
        if (isRestore) {
            document.location.href = "/admin/topics/trash";
        }
    } catch (e) {
        console.log(e);
    }
}

export const activeTopics = (data) => async (dispatch) => {
    try {
        const isActive = await api.patch("api/topic/"+data)
        if (isActive) {
            document.location.href = "/admin/topics";
        }
    } catch (e) {
        console.log(e);
    }
}
//PATCH ACTION END

//PUT ACTION BEGIN
export const updateTopic = (category) => async (dispatch) => {
    try {
        const data = await api.put(`api/topic/${category.id}`, category);
        if (data) {
            console.log(data.data);
            document.location.href = "/admin/topics";
        }
    } catch (e) {
        console.log(e);
    }
}
//PUT ACTION END
