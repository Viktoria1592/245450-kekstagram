'use strict';

(function (util) {
  var picturesContainer = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  var openOverlay = function (event, photos) {
    event.preventDefault();
    var clickedPhoto = event.currentTarget;
    var photo = photos[clickedPhoto.dataset.photoIndex];
    galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
    galleryOverlay.querySelector('img.gallery-overlay-image').src = photo.url;
    galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
    util.showBlock(galleryOverlay, 'hidden');
    document.addEventListener('keydown', onOverlayEscPress);
  };

  var onOverlayEscPress = function (event) {
    util.isEscEvent(event, closeOverlay);
  };

  var closeOverlay = function () {
    util.hideBlock(galleryOverlay, 'hidden');
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  var onPhotoClick = function (event, photos) {
    openOverlay(event, photos);
  };

  var onPhotoEnterPress = function (event, photos) {
    util.isEnterEvent(event, photos, openOverlay);
  };

  var onOverlayCloseClick = function () {
    closeOverlay();
  };

  var onOverlayCloseEnterPress = function (event) {
    util.isEnterEvent(event, closeOverlay);
  };

  var initPictureEventListeners = function (photos) {
    var pictures = picturesContainer.querySelectorAll('.picture');

    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', function (event) {
        onPhotoClick(event, photos);
      });
      pictures[i].addEventListener('keydown', function (event) {
        onPhotoEnterPress(event, photos);
      });
    }
  };

  var initOverlayEventListeners = function () {
    galleryOverlayClose.addEventListener('click', onOverlayCloseClick);
    galleryOverlayClose.addEventListener('keydown', onOverlayCloseEnterPress);
  };

  window.preview = {
    initPictureEventListeners: initPictureEventListeners,
    initOverlayEventListeners: initOverlayEventListeners
  };

})(window.util);
