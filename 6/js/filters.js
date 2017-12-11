'use strict';

(function () {

  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var effectContainer = uploadSelectImage.querySelector('.upload-effect-level');
  var uploadPhotoEffectInput = uploadSelectImage.querySelector('.upload-effect-level-value');
  var effectPin = uploadSelectImage.querySelector('.upload-effect-level-pin');
  var effectLine = uploadSelectImage.querySelector('.upload-effect-level-line');
  var effectFullLine = uploadSelectImage.querySelector('.upload-effect-level-val');
  var currentEffect;

  var MAX_EFFECT_VALUE = 100;
  var MIN_EFFECT_VALUE = 0;
  var DEFAULT_EFFECT_VALUE = 100;

  var setDefaultEffectParams = function () {
    effectContainer.classList.add('hidden');
    uploadPhotoEffectInput.style.display = 'none';
    uploadPhotoEffectInput.setAttribute('max', MAX_EFFECT_VALUE);
    uploadPhotoEffectInput.setAttribute('min', MIN_EFFECT_VALUE);
    uploadPhotoEffectInput.setAttribute('value', DEFAULT_EFFECT_VALUE);
    effectPin.style.left = '100%';
    effectFullLine.style.width = '100%';
  };

  var changeEffect = function () {
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

  var hideEffectContainer = function () {
    var elem = event.target;

    if (elem.value === 'none') {
      effectContainer.classList.add('hidden');
    } else {
      effectContainer.classList.remove('hidden');
    }
  };

  var onEffectControlsClick = function () {
    changeEffect();
    hideEffectContainer();
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset
    };
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
        effectImagePreview.style.filter = 'blur(' + (effectValue / 30 - 1 / 3) + 'px)';
        break;
      case ('effect-heat'):
        effectImagePreview.style.filter = 'brightness(' + (effectValue / 30 - 1 / 3) + ')';
        break;
    }
  };


  var onMouseDown = function (event) {
    event.preventDefault();
    var pinCoords = getCoords(effectPin);
    var shiftX = Math.round(event.pageX - pinCoords.left);

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      var effectLineCoords = getCoords(effectLine);
      var newLeft = Math.round(moveEvent.pageX - shiftX - effectLineCoords.left);

      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = effectLine.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      var effectValue = Math.round(newLeft / effectLine.offsetWidth * 100);

      effectPin.style.left = effectValue + '%';
      effectFullLine.style.width = effectValue + '%';


      uploadPhotoEffectInput.value = effectValue;
      uploadPhotoEffectInput.setAttribute('value', effectValue);

      changeEffectStrength(effectValue);
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };


  setDefaultEffectParams();
  uploadEffectControls.addEventListener('click', onEffectControlsClick);
  effectPin.addEventListener('mousedown', onMouseDown);

})();
