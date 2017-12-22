'use strict';
(function (util, pictures, preview) {
  var filters = document.querySelector('.filters');

  var showPhotos = function (photos) {
    pictures.renderPhotos(photos);
    preview.initPictureEventListeners(photos);
    preview.initOverlayEventListeners();
  };

  var changeOrder = function (photos) {
    var elem = event.target;
    if (elem.nodeName !== 'INPUT') {
      return;
    }

    switch (elem.value) {
      case ('recommend'):
        var sortedPhotos = photos;
        break;
      case ('popular'):
        sortedPhotos = photos.slice();
        sortedPhotos.sort(function (first, second) {
          return second.likes - first.likes;
        });
        break;
      case ('discussed'):
        sortedPhotos = photos.slice();
        sortedPhotos.sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
        break;
      case ('random'):
        sortedPhotos = photos.slice();
        sortedPhotos.sort(function () {
          return Math.random() - 0.5;
        });
        break;
    }

    util.debounce(function () {
      showPhotos(sortedPhotos);
    });
  };


  var initFiltersEventListeners = function (photos) {
    util.showBlock(filters, 'filters-inactive');
    var onFiltersClick = function () {
      changeOrder(photos);
    };
    filters.addEventListener('click', onFiltersClick);
  };

  window.initializeSort = {
    initFiltersEventListeners: initFiltersEventListeners
  };
})(window.util, window.pictures, window.preview);
