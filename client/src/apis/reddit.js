import axios from 'axios';
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: 'https://chowtime-tv.herokuapp.com/',
  // baseURL: 'http://localhost:3001',
  // baseURL: 'http://192.168.0.119:3001',
  credentials: 'same-origin'
});