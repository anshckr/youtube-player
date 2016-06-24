var axios = require('axios');

export default {
    getItems(query) {
        return gapi.client.youtube.search.list({
            q: query,
            part: 'snippet',
            maxResults: 20
        });
    }
};
