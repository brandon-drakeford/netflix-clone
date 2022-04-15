import axios from 'axios'

const KEY = 'AIzaSyDgAdWts5oTjZ3aaEANuYc-xZwUBri9u5s';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: '1',
        key: KEY
    }
})