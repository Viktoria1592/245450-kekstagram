'use strict';

(function (util) {

  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_HASHTAGS_LENGTH = 20;
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('#upload-file');
  var uploadImage = document.querySelector('.upload-image');
  var uploadOverlay = uploadSelectImage.querySelector('.upload-overlay');
  var uploadFormCancel = uploadSelectImage.querySelector('.upload-form-cancel');
  var commentsArea = uploadSelectImage.querySelector('.upload-form-description');
  var hashtagsArea = document.querySelector('.upload-form-hashtags');

  var openUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
  };

  var onUploadOverlayEscPress = function (event) {
    if (event.target !== commentsArea) {
      util.isEscEvent(event, closeUploadOverlay);
    }
  };

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    uploadFile.removeAttribute('onclick');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  var onUploadFileChange = function () {
    openUploadOverlay();
  };

  var onUploadImageEnterPress = function (event) {
    util.isEnterEvent(event, openUploadOverlay);
  };

  var onUploadOverlayCloseClick = function () {
    closeUploadOverlay();
  };

  var onUploadOverlayCloseEnterPress = function (event) {
    util.isEnterEvent(event, closeUploadOverlay);
  };

  var initUploadOverlayEventListeners = function () {
    uploadFile.addEventListener('change', onUploadFileChange);
    uploadImage.addEventListener('keydown', onUploadImageEnterPress);
    uploadFormCancel.addEventListener('click', onUploadOverlayCloseClick);
    uploadFormCancel.addEventListener('keydown', onUploadOverlayCloseEnterPress);
  };

  var checkTagAmount = function (hashtagArr, event) {
    if (hashtagArr.length > MAX_HASHTAGS_AMOUNT) {
      showError(event);
      return false;
    }
    return true;
  };

  var checkTag = function (hashtagArr, i, event) {
    var arrElem = hashtagArr[i];
    if (arrElem[0] !== '#' || arrElem.length > MAX_HASHTAGS_LENGTH || !checkDuplicate(hashtagArr, i, event)) {
      showError(event);
      return false;
    }
    return true;
  };

  var checkDuplicate = function (hashtagArr, i, event) {
    for (var j = 0; j < hashtagArr.length; j++) {
      if (i !== j && hashtagArr[i].toLowerCase() === hashtagArr[j].toLowerCase()) {
        showError(event);
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

  var onFormSubmit = function (event) {
    var currentHashtagValue = hashtagsArea.value;
    var isFormValid = checkForm(currentHashtagValue, event);
    if (isFormValid) {
      setTimeout(function () {
        uploadSelectImage.reset();
      });
      hashtagsArea.style.border = '';
    }
  };

  var showError = function (event) {
    event.preventDefault();
    hashtagsArea.style.border = '2px solid #ba0200';
  };

  initUploadOverlayEventListeners();

  uploadSelectImage.addEventListener('submit', onFormSubmit);

})(window.util);
