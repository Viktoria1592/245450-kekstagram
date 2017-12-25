'use strict';

(function (util, initializeFilters, initializeSlider) {

  var EffectValue = {
    MIN: 0,
    MAX: 100,
    DEFAULT: 100
  };

  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var effectContainer = uploadSelectImage.querySelector('.upload-effect-level');
  var uploadEffectInput = uploadSelectImage.querySelector('.upload-effect-level-value');
  var effectPin = uploadSelectImage.querySelector('.upload-effect-level-pin');
  var effectLine = uploadSelectImage.querySelector('.upload-effect-level-line');
  var effectFullLine = uploadSelectImage.querySelector('.upload-effect-level-val');
  var currentEffect;

  var setDefaultEffectParams = function () {
    util.hideBlock(effectContainer, 'hidden');
    util.hideBlock(uploadEffectInput, 'hidden');
    uploadEffectInput.setAttribute('max', EffectValue.MAX);
    uploadEffectInput.setAttribute('min', EffectValue.MIN);
    uploadEffectInput.setAttribute('value', EffectValue.DEFAULT);
    effectImagePreview.style.maxWidth = '586px';
    effectPin.style.left = '100%';
    effectFullLine.style.width = '100%';
  };

  var changeEffect = function (event) {
    var elem = event.target;
    if (elem.nodeName !== 'INPUT') {
      return;
    }
    if (currentEffect) {
      effectImagePreview.classList.remove(currentEffect);
    }
    currentEffect = 'effect-' + elem.value;
    effectImagePreview.classList.add(currentEffect);
    effectImagePreview.style = '';
    setDefaultEffectParams();
  };

  var hideEffectContainer = function (event) {
    var elem = event.target;

    if (elem.value === 'none') {
      util.hideBlock(effectContainer, 'hidden');
    } else {
      util.showBlock(effectContainer, 'hidden');
    }
  };

  var changeEffectStrength = function (effectValue) {
    switch (currentEffect) {
      case ('effect-chrome'):
        effectImagePreview.style.filter = 'grayscale(' + effectValue / 100 + ')';
        break;
      case ('effect-marvin'):
        effectImagePreview.style.filter = 'invert(' + effectValue + '%)';
        break;
      case ('effect-sepia'):
        effectImagePreview.style.filter = 'sepia(' + effectValue / 100 + ')';
        break;
      case ('effect-phobos'):
        effectImagePreview.style.filter = 'blur(' + (effectValue * 3 / 100) + 'px)';
        break;
      case ('effect-heat'):
        effectImagePreview.style.filter = 'brightness(' + (effectValue * 3 / 100) + ')';
        break;
    }
  };

  setDefaultEffectParams();
  initializeFilters(uploadEffectControls, changeEffect, hideEffectContainer);
  initializeSlider(effectPin, effectLine, effectFullLine, uploadEffectInput, changeEffectStrength);

})(window.util, window.initializeFilters, window.initializeSlider);
