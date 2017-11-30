'use strict';

var DEFAULT_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTOS_COUNT = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var pictureTemplate = document.querySelector('#picture-template').content;
var picturesContainer = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * (max - min) + min));
};

var getRandomArrElement = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var generateComments = function () {
  var count = getRandomNumber(0, DEFAULT_COMMENTS.length);
  var comments = [];
  for (var i = 0; i < count; i++) {
    var newCommentString = getRandomArrElement(DEFAULT_COMMENTS);
    comments.push(newCommentString);
  }
  return comments;
};

var createPhotoBlock = function (photo, index) {
  var photoBlock = pictureTemplate.cloneNode(true);
  photoBlock.querySelector('img').src = photo.url;
  photoBlock.querySelector('.picture-likes').textContent = photo.likes;
  photoBlock.querySelector('.picture-comments').textContent = photo.comments.length;
  photoBlock.querySelector('.picture').dataset.photoIndex = index;
  return photoBlock;
};

var createPhotoArr = function (numberOfObjects) {
  var photos = [];
  for (var i = 0; i < numberOfObjects; i++) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: generateComments()
    };
    photos.push(photo);
  }
  return photos;
};

var renderPhotoBlocks = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotoBlock(photos[i], i));
  }
  return fragment;
};

var showPhotoBlocks = function (photos) {
  var photoBlocks = renderPhotoBlocks(photos);
  picturesContainer.appendChild(photoBlocks);
};

var openOverlay = function (event, photos) {
  event.preventDefault();
  var clickedPhoto = event.currentTarget;
  var photo = photos[clickedPhoto.dataset.photoIndex];
  galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
  galleryOverlay.querySelector('img.gallery-overlay-image').src = photo.url;
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayEscPress);
};

var onOverlayEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
};

var closeOverlay = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onOverlayEscPress);
};

var onPhotoClick = function (event, photos) {
  openOverlay(event, photos);
};

var onPhotoEnterPress = function (event, photos) {
  if (event.keyCode === ENTER_KEYCODE) {
    openOverlay(event, photos);
  }
};

var onOverlayCloseClick = function () {
  closeOverlay();
};

var onOverlayCloseEnterPress = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeOverlay();
  }
};

var initPictureEventListeners = function (photos) {
  var pictures = picturesContainer.querySelectorAll('.picture');

  for (var i = 0; i < pictures.length; i++) {

    pictures[i].addEventListener('click', function (event) {
      onPhotoClick(event, photos);
    });

    pictures[i].addEventListener('keydown', function (event) {
      onPhotoEnterPress(event, photos);
    });

  }
};

var initOverlayEventListeners = function () {
  galleryOverlayClose.addEventListener('click', onOverlayCloseClick);
  galleryOverlayClose.addEventListener('keydown', onOverlayCloseEnterPress);
};

var init = function () {
  var photos = createPhotoArr(PHOTOS_COUNT);
  showPhotoBlocks(photos);
  initPictureEventListeners(photos);
  initOverlayEventListeners();
};

init();
