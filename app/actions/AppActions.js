import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
    ITEMS_GET_SUCCESS,
    ITEMS_GET_ERROR
} from '../constants/AppConstants';

export default {
    getItems (query, nextPageToken) {
        WebAPI.getItems(query, nextPageToken)
            .then((response) => {
                AppDispatcher.dispatch({
                    actionType: ITEMS_GET_SUCCESS,
                    items: response.result.items,
                    nextPageToken: response.result.nextPageToken
                });
            }, () => {
                AppDispatcher.dispatch({
                    actionType: ITEMS_GET_ERROR
                });
            });
    }
};
