'use strict';

window.util = (function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  var DEBOUNCE_INTERVAL = 500;

  return {
    isEscEvent: function (event, action) {
      if (event.keyCode === KeyCode.ESC) {
        action();
      }
    },

    isEnterEvent: function (event, action) {
      if (event.keyCode === KeyCode.ENTER) {
        action();
      }
    },

    showBlock: function (elem, key) {
      elem.classList.remove(key);
    },

    hideBlock: function (elem, key) {
      elem.classList.add(key);
    },

    getRandomValueOfArr: function (arr) {
      var rnd = Math.floor(Math.random() * arr.length);
      return arr[rnd];
    },

    debounce: function (action) {
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
    }

  };
})();
