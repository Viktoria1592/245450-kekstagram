'use strict';

window.main = (function (backend, pictures, preview) {

  var onLoad = function (photos) {
    pictures.renderPhotos(photos);
    preview.initPictureEventListeners(photos);
    preview.initOverlayEventListeners();
  };

  var init = function () {
    backend.load(onLoad, backend.showError);
  };

  init();

})(window.backend, window.pictures, window.preview);
