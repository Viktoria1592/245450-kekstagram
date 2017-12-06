'use strict';

(function () {
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

  var renderPhotoBlocks = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createPhotoBlock(photos[i], i));
    }
    return fragment;
  };

  var showPhotoBlocks = function (photos) {
    var photoBlocks = renderPhotoBlocks(photos);
    picturesContainer.appendChild(photoBlocks);
  };

  var init = function () {
    var photos = window.data.photoArr;
    showPhotoBlocks(photos);
  };

  init();

})();
