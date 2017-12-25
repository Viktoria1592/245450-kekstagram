'use strict';

(function () {
  window.initializeFilters = function (elem, action, hide) {
    var onEffectControlsClick = function (event) {
      action(event);
      hide(event);
    };
    elem.addEventListener('click', onEffectControlsClick);
  };
})();
