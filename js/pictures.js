'use strict';

window.pictures = (function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesContainer = document.querySelector('.pictures');

  var createPhotoBlock = function (photo, index) {
    var photoBlock = pictureTemplate.cloneNode(true);
    photoBlock.querySelector('img').src = photo.url;
    photoBlock.querySelector('.picture-likes').textContent = photo.likes;
    photoBlock.querySelector('.picture-comments').textContent = photo.comments.length;
    photoBlock.querySelector('.picture').dataset.photoIndex = index;
    return photoBlock;
  };

  var renderPhotos = function (photos) {
    picturesContainer.textContent = '';
    photos.forEach(function (photo, index) {
      picturesContainer.appendChild(createPhotoBlock(photo, index));
    });
  };

  return {
    renderPhotos: renderPhotos
  };

})();
