'use strict';

(function (backend, form) {
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var errorWindow = null;
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadEffectContainer = uploadSelectImage.querySelector('.upload-effect__container');
  var hashtagsArea = uploadSelectImage.querySelector('.upload-form-hashtags');

  var isTagAmountValid = function (hashtags) {
    return hashtags.length <= MAX_HASHTAGS_AMOUNT;
  };

  var isTagValid = function (hashtags, i) {
    var hashtag = hashtags[i];
    return hashtag[0] === '#' && hashtag.length <= MAX_HASHTAG_LENGTH && isNotDuplicate(hashtags, i);
  };

  var isNotDuplicate = function (hashtags, currentIndex) {
    return hashtags.every(function (hashtag, i) {
      return currentIndex === i || hashtags[currentIndex].toLowerCase() !== hashtags[i].toLowerCase();
    });
  };

  var isTagsValid = function (hashtags) {
    return hashtags.every(function (hashtag, i) {
      return isTagValid(hashtags, i);
    });
  };

  var isFormValid = function (currentHashtagValue, event) {
    if (currentHashtagValue === '') {
      return true;
    }
    var hashtags = currentHashtagValue.split(' ').filter(function (tag) {
      return tag !== '';
    });
    if (!isTagAmountValid(hashtags) || !isTagsValid(hashtags)) {
      showValidationError(event);
      return false;
    }
    return true;
  };

  var showFormError = function (errorMessage) {
    errorWindow = document.createElement('div');
    uploadEffectContainer.appendChild(errorWindow);
    errorWindow.style.width = '50%';
    errorWindow.style.height = '50px';
    errorWindow.style.border = '2px solid tomato';
    errorWindow.style.margin = '0 auto';
    errorWindow.style.display = 'flex';
    errorWindow.style.alignItems = 'center';
    errorWindow.style.justifyContent = 'center';
    errorWindow.style.color = 'tomato';
    errorWindow.textContent = errorMessage;
  };

  var onSuccess = function () {
    uploadSelectImage.reset();
    form.closeFormWindow();
  };

  var onError = function (errorMessage) {
    showFormError(errorMessage);
  };

  var onSubmit = function (event) {
    var currentHashtagValue = hashtagsArea.value;
    if (isFormValid(currentHashtagValue, event)) {
      if (errorWindow) {
        uploadEffectContainer.removeChild(errorWindow);
      }
      hashtagsArea.style.border = '';
      backend.save(new FormData(uploadSelectImage), onSuccess, onError);
    }
  };

  var onFormSubmit = function (event) {
    event.preventDefault();
    onSubmit(event);
  };

  var showValidationError = function (event) {
    event.preventDefault();
    hashtagsArea.style.border = '2px solid #ba0200';
  };

  uploadSelectImage.addEventListener('submit', onFormSubmit);

})(window.backend, window.form);
