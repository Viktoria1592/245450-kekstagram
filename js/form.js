'use strict';

window.form = (function (util) {
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('#upload-file');
  var uploadImage = document.querySelector('.upload-image');
  var uploadOverlay = uploadSelectImage.querySelector('.upload-overlay');
  var uploadFormCancel = uploadSelectImage.querySelector('.upload-form-cancel');
  var commentsArea = uploadSelectImage.querySelector('.upload-form-description');

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

  initUploadOverlayEventListeners();

  return {
    closeFormWindow: closeUploadOverlay
  };

})(window.util);
