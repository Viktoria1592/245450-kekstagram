'use strict';

(function (initializeScale) {
  var sizeBigger = document.querySelector('.upload-resize-controls-button-inc');
  var sizeSmaller = document.querySelector('.upload-resize-controls-button-dec');
  var sizeInput = document.querySelector('.upload-resize-controls-value');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');


  var changeScale = function (currentSizeValue) {
    effectImagePreview.style.transform = 'scale(' + (currentSizeValue / 100) + ')';
  };

  initializeScale(sizeInput, sizeBigger, sizeSmaller, uploadEffectControls, changeScale);

})(window.initializeScale);
