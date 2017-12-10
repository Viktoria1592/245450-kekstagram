'use strict';

window.data = (function () {
  var DEFAULT_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var PHOTOS_COUNT = 25;

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

  return {
    photoArr: createPhotoArr(PHOTOS_COUNT)
  };

})();
