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

var pictureTemplate = document.querySelector('#picture-template').content;
var picturesContainer = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');

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

var createPhotoBlock = function (photo) {
  var photoBlock = pictureTemplate.cloneNode(true);
  photoBlock.querySelector('img').src = photo.url;
  photoBlock.querySelector('.picture-likes').textContent = photo.likes;
  photoBlock.querySelector('.picture-comments').textContent = photo.comments.length;
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
    fragment.appendChild(createPhotoBlock(photos[i]));
  }
  return fragment;
};

var showPhotoBlocks = function () {
  var photos = createPhotoArr(PHOTOS_COUNT);
  var photoBlocks = renderPhotoBlocks(photos);
  picturesContainer.appendChild(photoBlocks);
  galleryOverlay.querySelector('.gallery-overlay-image').src = photos[0].url;
  galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes;
  galleryOverlay.querySelector('.comments-count').textContent = photos[0].comments.length;
  galleryOverlay.classList.remove('hidden');
};

showPhotoBlocks();
