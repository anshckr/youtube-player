export default {
    getItems (query, nextPageToken) {
        return gapi.client.youtube.search.list({
            q: query,
            part: 'snippet',
            maxResults: 20,
            type: 'video',
            pageToken: nextPageToken || null
        });
    }
};
