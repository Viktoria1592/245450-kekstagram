'use strict';

(function (backend, form) {
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_HASHTAGS_LENGTH = 20;
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var hashtagsArea = uploadSelectImage.querySelector('.upload-form-hashtags');

  var checkTagAmount = function (hashtagArr, event) {
    if (hashtagArr.length > MAX_HASHTAGS_AMOUNT) {
      showValidationError(event);
      return false;
    }
    return true;
  };

  var checkTag = function (hashtagArr, i, event) {
    var arrElem = hashtagArr[i];
    if (arrElem[0] !== '#' || arrElem.length > MAX_HASHTAGS_LENGTH || !checkDuplicate(hashtagArr, i, event)) {
      showValidationError(event);
      return false;
    }
    return true;
  };

  var checkDuplicate = function (hashtagArr, i, event) {
    for (var j = 0; j < hashtagArr.length; j++) {
      if (i !== j && hashtagArr[i].toLowerCase() === hashtagArr[j].toLowerCase()) {
        showValidationError(event);
        return false;
      }
    }
    return true;
  };

  var checkForm = function (currentHashtagValue, event) {
    if (currentHashtagValue !== '') {
      var hashtagArr = currentHashtagValue.split(' ');
      var isTagAmountValid = checkTagAmount(hashtagArr, event);
      if (!isTagAmountValid) {
        return false;
      }

      for (var i = 0; i < hashtagArr.length; i++) {
        var isTagValid = checkTag(hashtagArr, i, event);
        if (!isTagValid) {
          return false;
        }
      }
    }
    return true;
  };

  var onSuccess = function () {
    var currentHashtagValue = hashtagsArea.value;
    var isFormValid = checkForm(currentHashtagValue, event);
    if (isFormValid) {
      setTimeout(function () {
        uploadSelectImage.reset();
      });
      hashtagsArea.style.border = '';
      backend.save(new FormData(uploadSelectImage), form.closeFormWindow, backend.showError);
    }
  };

  var onFormSubmit = function (event) {
    event.preventDefault();
    onSuccess();
  };

  var showValidationError = function (event) {
    event.preventDefault();
    hashtagsArea.style.border = '2px solid #ba0200';
  };

  uploadSelectImage.addEventListener('submit', onFormSubmit);

})(window.backend, window.form);
