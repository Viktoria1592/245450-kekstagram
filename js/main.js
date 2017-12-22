'use strict';

(function (backend, pictures, preview, initializeSort) {
  var onLoad = function (photos) {
    pictures.renderPhotos(photos);
    preview.initPictureEventListeners(photos);
    preview.initOverlayEventListeners();
    initializeSort.initFiltersEventListeners(photos);
  };

  var init = function () {
    backend.load(onLoad, backend.showError);
  };

  init();

})(window.backend, window.pictures, window.preview, window.initializeSort);
