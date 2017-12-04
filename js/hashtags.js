'use strict';

var MAX_HASHTAGS_AMOUNT = 5;
var MAX_HASHTAGS_LENGTH = 20;
var uploadSelectImage = document.querySelector('#upload-select-image');
var hashtagsArea = document.querySelector('.upload-form-hashtags');

var onFormSubmit = function (event) {
  var currentHashtagValue = hashtagsArea.value;
  var hashtagArr = currentHashtagValue.split(' ');
  if (hashtagArr.length > MAX_HASHTAGS_AMOUNT) {
    showError(event);
    return;
  }

  for (var i = 0; i < hashtagArr.length; i++) {
    var arrElem = hashtagArr[i];
    if (currentHashtagValue !== '') {

      if (arrElem[0] !== '#' || arrElem.length > MAX_HASHTAGS_LENGTH) {
        showError(event);
        return;
      }

      for (var j = 0; j < hashtagArr.length; j++) {
        if (i !== j && hashtagArr[i].toLowerCase() === hashtagArr[j].toLowerCase()) {
          showError(event);
          return;
        }
      }

    }
  }
};

var showError = function (event) {
  event.preventDefault();
  hashtagsArea.style.border = '2px solid #ba0200';
};

uploadSelectImage.addEventListener('submit', onFormSubmit);
