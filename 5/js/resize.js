'use strict';
(function () {

  var MIN_SIZE_VALUE = 25;
  var MAX_SIZE_VALUE = 100;
  var STEP_SIZE_VALUE = 25;
  var sizeBigger = document.querySelector('.upload-resize-controls-button-inc');
  var sizeSmaller = document.querySelector('.upload-resize-controls-button-dec');
  var sizeInput = document.querySelector('.upload-resize-controls-value');
  var effectImagePreview = document.querySelector('.effect-image-preview');

  var getScaleValue = function () {
    return parseInt(sizeInput.value.slice(0, -1), 10);
  };

  var makeBigger = function () {
    var currentSizeValue = getScaleValue();
    if (currentSizeValue < MAX_SIZE_VALUE && currentSizeValue >= MIN_SIZE_VALUE) {
      currentSizeValue += STEP_SIZE_VALUE;
      changeScale(currentSizeValue);
    }
  };

  var makeSmaller = function () {
    var currentSizeValue = getScaleValue();
    if (currentSizeValue <= MAX_SIZE_VALUE && currentSizeValue > MIN_SIZE_VALUE) {
      currentSizeValue -= STEP_SIZE_VALUE;
      changeScale(currentSizeValue);
    }
  };

  var changeScale = function (currentSizeValue) {
    sizeInput.value = currentSizeValue + '%';
    effectImagePreview.style.transform = 'scale(' + (currentSizeValue / 100) + ')';
  };


  var onSizeBiggerClick = function () {
    makeBigger();
  };

  var onSizeSmallerClick = function () {
    makeSmaller();
  };

  var initResizeListeners = function () {
    sizeBigger.addEventListener('click', onSizeBiggerClick);
    sizeSmaller.addEventListener('click', onSizeSmallerClick);
  };

  initResizeListeners();

})();
