import * as ActionTypes from './ActionTypes'
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => async dispatch => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    }
    newComment.date = new Date().toISOString();

    try {
        let response = await fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        if (response.ok) {
            const postComments = await response.json();
            dispatch(addComment(postComments))
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error
        }
    } catch (error) {
        console.log(`Post comments ${error.message}`);
        alert(`Your post could not be posted \n${error.message}`);
    }
}

export const fetchDishes = () => async dispatch => {
    dispatch(dishesLoading());

    try {
        let response = await fetch(baseUrl + 'dishes');
        if (response.ok) {
            const dishes = await response.json()
            dispatch(addDishes(dishes));
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    } catch (error) {
        dispatch(dishesFailed(error.message));
    }
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => async dispatch  => {    
    try {
        let response = await fetch(baseUrl + 'comments');
        if (response.ok) {
            const comments = await response.json();
            dispatch(addComments(comments));
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    } catch (error) {
        dispatch(commentsFailed(error.message));
    }
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => async dispatch => {
    dispatch(promosLoading());

    try {
        let response = await fetch(baseUrl + 'promotions');
        if (response.ok) {
            let promotions = await response.json();
            dispatch(addPromos(promotions)); 
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    } catch (error) {
        throw dispatch(promosFailed(error.message))
    }
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => async dispatch => {
    dispatch(leadersLoading());

    try {
        let response = await fetch(baseUrl + 'leaders');
        if (response.ok) {
            const leaders = await response.json()
            dispatch(addLeaders(leaders));
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    } catch (error) {
        dispatch(leadersFailed(error.message));
    }
}

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
})

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});


export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => async dispatch => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    }
    newFeedback.date = new Date().toISOString();

    try {
        let response = await fetch(baseUrl + 'feedback', {
            method: 'POST',
            body: JSON.stringify(newFeedback),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        if (response.ok) {
            const postFeedback = await response.json();
            dispatch(addFeedback(postFeedback))
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    } catch (error) {
        console.log(`feedback ${error.message}`);
        alert(`Your feedback could not be posted \n${error.message}`);
    }
}
