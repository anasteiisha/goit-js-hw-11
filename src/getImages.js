import axios from 'axios';
// import Notiflix from 'notiflix';
import { inputValue } from './index';
import { currentPage } from './index';

async function getImages() {
  BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '36083608-210db4eaa41b45ddd8228d7c6';

  const params = new URLSearchParams({
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: currentPage,
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  console.log(response);
  return response;

  //   try {
  //     const response = await axios.get(`https://pixabay.com/api/${params}`);
  //     // console.log(response);
  //     return response;
  //   } catch (err) {
  //     Notiflix.Notify.info(err.message);
  //   }
}

export { getImages };
