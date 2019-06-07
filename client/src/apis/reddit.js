import axios from 'axios';

// AIzaSyD8tolblc1GwGa5ektFp9S81H3ocA9uYWA api key
// const KEY = 'AIzaSyD8tolblc1GwGa5ektFp9S81H3ocA9uYWA';

export default axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL: 'https://www.reddit.com/r/mealtimevideos',
});