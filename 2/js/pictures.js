'use strict';

var commentsArr = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var pictureTemplate = document.querySelector('#picture-template').content;
var picturesContainer = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');

var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * (max - min) + min));
};

var getRandomString = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var createPhotoBlock = function (photo) {
  var photoBlock = pictureTemplate.cloneNode(true);
  photoBlock.querySelector('img').src = photo.url;
  photoBlock.querySelector('.picture-likes').textContent = photo.likes;
  photoBlock.querySelector('.picture-comments').textContent = photo.comments;
  return photoBlock;
};

var createPhotoObject = function (numberOfObjects) {
  var photo = {};
  for (var i = 1; i <= numberOfObjects; i++) {
    photo[i] = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomString(commentsArr)
    };
  }
  return photo;
};

var photoObject = createPhotoObject(25);

var renderPhotoBlocks = function (numberOfObjects) {
  var fragment = document.createDocumentFragment();
  for (var i = 1; i <= numberOfObjects; i++) {
    fragment.appendChild(createPhotoBlock(photoObject[i]));
  }
  return fragment;
};

var showPhotoBlocks = function () {
  picturesContainer.appendChild(renderPhotoBlocks(25));
  galleryOverlay.querySelector('.gallery-overlay-image').src = photoObject[1].url;
  galleryOverlay.querySelector('.likes-count').textContent = photoObject[1].likes;
  galleryOverlay.querySelector('.comments-count').textContent = photoObject[1].comments;
  galleryOverlay.classList.remove('hidden');
};

showPhotoBlocks();
