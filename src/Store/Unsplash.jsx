import axios from 'axios';

const ACCESS_KEY = 'pPmFJUY0HOZSXw2vYjtvaM2VAaKc1958_Xw-LKPwrNE';
const BASE_URL = 'https://api.unsplash.com/';

const unsplashApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`
  }
});

export default unsplashApi;
