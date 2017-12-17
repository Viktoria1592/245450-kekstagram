'use strict';

window.initializeScale = function (input, inc, dec, effectControl, action) {
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var STEP = 25;

  var getScaleValue = function () {
    return parseInt(input.value.slice(0, -1), 10);
  };

  var setScaleValue = function (value) {
    input.value = value + '%';
    action(value);
  };

  var onIncClick = function () {
    var value = getScaleValue();
    if (value < MAX_VALUE && value >= MIN_VALUE) {
      value += STEP;
      setScaleValue(value);
    }
  };

  var onDecClick = function () {
    var value = getScaleValue();
    if (value <= MAX_VALUE && value > MIN_VALUE) {
      value -= STEP;
      setScaleValue(value);
    }
  };

  var onEffectControlClick = function () {
    var value = getScaleValue();
    setScaleValue(value);
  };

  inc.addEventListener('click', onIncClick);
  dec.addEventListener('click', onDecClick);
  effectControl.addEventListener('click', onEffectControlClick);
};
