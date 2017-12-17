'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';

  var xhrAction = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var getServerStatus = function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var showServerError = function () {
      onError('Произошла ошибка соединения');
    };

    var showSlowServerError = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', getServerStatus);
    xhr.addEventListener('error', showServerError);
    xhr.addEventListener('timeout', showSlowServerError);

    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = xhrAction(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = xhrAction(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    showError: function (errorMessage) {
      var errorWindow = document.querySelector('.upload-message');
      errorWindow.classList.remove('hidden');
      errorWindow.style.width = '90%';
      errorWindow.style.border = '4px solid tomato';
      errorWindow.style.borderRadius = '70px';
      errorWindow.style.margin = '50px auto';
      errorWindow.style.display = 'flex';
      errorWindow.style.alignItems = 'center';
      errorWindow.style.justifyContent = 'center';
      errorWindow.style.color = 'tomato';
      errorWindow.textContent = errorMessage;
    }
  };
})();
