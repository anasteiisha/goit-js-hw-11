import { galleryEl } from './index';

function createGalleryMarkup(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
        <div class="photo-card">
            <a class="gallery-item" href="${largeImageURL}">
                <img src=${webformatURL} alt="${tags}" loading="lazy" />
            </a>

            <div class="info">
                <p class="info-item">
                <b>Likes</b> ${likes}
                </p>
                <p class="info-item">
                <b>Views</b> ${views}
                </p>
                <p class="info-item">
                <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b> ${downloads}
                </p>
            </div>
    </div>`
    )
    .join('');

  return markup;
}

export { createGalleryMarkup };
