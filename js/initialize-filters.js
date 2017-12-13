'use strict';

window.initializeFilters = function (elem, action, hide) {
  var onEffectControlsClick = function () {
    action();
    hide();
  };
  elem.addEventListener('click', onEffectControlsClick);
};
