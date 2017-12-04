'use strict';

(function () {

  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var currentEffect;

  uploadEffectControls.addEventListener('click', function (event) {
    var elem = event.target;

    if (elem.nodeName !== 'INPUT') {
      return;
    }

    if (currentEffect) {
      effectImagePreview.classList.remove(currentEffect);
    }

    currentEffect = 'effect-' + elem.value;
    effectImagePreview.classList.add(currentEffect);

  });

})();
