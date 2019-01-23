import axios from 'axios';

// AIzaSyD8tolblc1GwGa5ektFp9S81H3ocA9uYWA api key
const KEY = 'AIzaSyD8tolblc1GwGa5ektFp9S81H3ocA9uYWA';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResult: 15,
    key: KEY
  }
});