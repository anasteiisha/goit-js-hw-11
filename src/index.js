import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './getImages';
import { createGalleryMarkup } from './galleryMarkup';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('#search-form input');
const btnSearch = document.querySelector('button');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let inputValue = '';
let currentPage = 1;
let totalPage = 0;
let perPage = 0;

let galleryLightBox = new SimpleLightbox('.gallery a');

formEl.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  inputValue = searchQuery.value.trim();
  currentPage = 1;
  loadMoreBtn.hidden = true;

  if (inputValue === '') {
    e.currentTarget.reset();
    return;
  }
  try {
    const dataGallery = await getImages();

    galleryEl.innerHTML = createGalleryMarkup(dataGallery.data.hits);
    galleryLightBox.refresh();

    if (dataGallery.data.hits.length) {
      Notiflix.Notify.success(
        `Hooray! We found ${dataGallery.data.totalHits} images.`
      );
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      galleryEl.innerHTML = '';
      loadMoreBtn.hidden = true;
    }

    totalPage =
      Math.ceil(dataGallery.data.totalHits / dataGallery.data.hits.length) ||
      'Сторінки відсутні';
    perPage = dataGallery.data.hits.length;

    console.log(`Номер сторінки: ${currentPage}`);
    console.log(`Загальна кількість сторінок: ${totalPage}`);
    console.log(`Кількість карток на сторінці: ${perPage}`);

    if (totalPage > currentPage) {
      loadMoreBtn.hidden = false;
    }
  } catch (error) {
    console.error(error);
    galleryEl.innerHTML = '';
    loadMoreBtn.hidden = true;
    currentPage = 1;
  }
}

inputEl.addEventListener('input', event => {
  if (event.currentTarget.value === '') {
    galleryEl.innerHTML = '';
    loadMoreBtn.hidden = true;
    currentPage = 1;
  }
});

formEl.addEventListener('submit', onSubmit);

// function createGalleryMarkup(images) {
//   const markup = images.map(
//     ({
//       webformatURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,
//     }) =>
//       `<a class="gallery-item" href="${largeImageURL}">
//         <div class="photo-card">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes</b> ${likes}
//           </p>
//           <p class="info-item">
//             <b>Views</b> ${views}
//           </p>
//           <p class="info-item">
//             <b>Comments</b>${comments}
//           </p>
//           <p class="info-item">
//             <b>Downloads</b> ${downloads}
//           </p>
//         </div>
//       </div></a>`
//   );

//   galleryEl.insertAdjacentHTML('beforeend', markup.join(''));
//   lightbox.refresh();
// }
async function onClickLoadMoreBtn() {
  currentPage += 1;
  if (currentPage === totalPage) {
    loadMoreBtn.hidden = true;

    Notiflix.Notify.failure(
      'We/re sorry, but you/ve reached the end of search results.'
    );
  }
  try {
    const dataGalleryPagination = await getImages();
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryMarkup(dataGalleryPagination.data.hits)
    );
    galleryLightBox.refresh();
    perPage = dataGalleryPagination.data.hits.length;

    console.log(`Номер сторінки: ${currentPage}`);
    console.log(`Загальна кількість сторінок: ${totalPage}`);
    console.log(`Кількість карток на сторінці: ${perPage}`);
  } catch (error) {
    console.error(error);
    galleryEl.innerHTML = '';
    loadMoreBtn.hidden = true;
    currentPage = 1;
  }
}

export { inputValue };
export { currentPage };
