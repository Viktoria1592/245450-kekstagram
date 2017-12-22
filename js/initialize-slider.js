'use strict';

(function () {
  window.initializeSlider = function (pin, sliderLine, sliderFullLine, sliderValue, sliderAction) {
    var getCoords = function (elem) {
      var box = elem.getBoundingClientRect();

      return {
        left: box.left + pageXOffset
      };
    };

    var getNewLeft = function (moveEvent, shiftX, sliderLineCoords) {
      var newLeft = Math.round(moveEvent.pageX - shiftX - sliderLineCoords.left);

      if (newLeft < 0) {
        return 0;
      }
      var rightEdge = sliderLine.offsetWidth;
      if (newLeft > rightEdge) {
        return rightEdge;
      }
      return newLeft;
    };

    var getEffectValue = function (left) {
      return Math.round(left / sliderLine.offsetWidth * 100);
    };

    var applyValue = function (effectValue) {
      pin.style.left = effectValue + '%';
      sliderFullLine.style.width = effectValue + '%';

      sliderValue.value = effectValue;
    };

    var onMouseDown = function (event) {
      event.preventDefault();
      var pinCoords = getCoords(pin);
      var shiftX = Math.round(event.pageX - pinCoords.left);

      var onMouseMove = function (moveEvent) {
        moveEvent.preventDefault();
        var sliderLineCoords = getCoords(sliderLine);

        var newLeft = getNewLeft(moveEvent, shiftX, sliderLineCoords);

        var effectValue = getEffectValue(newLeft);

        applyValue(effectValue);

        sliderAction(effectValue);
      };

      var onMouseUp = function (upEvent) {
        upEvent.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    };

    pin.addEventListener('mousedown', onMouseDown);
  };
})();
