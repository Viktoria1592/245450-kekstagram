'use strict';

(function (util) {
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadFile = uploadSelectImage.querySelector('#upload-file');
  var uploadImage = uploadSelectImage.querySelector('.upload-image');
  var uploadOverlay = uploadSelectImage.querySelector('.upload-overlay');
  var uploadFormCancel = uploadSelectImage.querySelector('.upload-form-cancel');
  var commentsArea = uploadSelectImage.querySelector('.upload-form-description');
  var preview = uploadSelectImage.querySelector('.effect-image-preview');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadPicture = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var openUploadOverlay = function () {
    util.showBlock(uploadOverlay, 'hidden');
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
    uploadPicture();
  };

  var onUploadImageEnterPress = function () {
    uploadFile.click();
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

  initUploadOverlayEventListeners();

  window.form = {
    closeFormWindow: closeUploadOverlay
  };

})(window.util);
