'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var chooserPhoto = document.querySelector('.ad-form__field input[type=file]');
  var previewPhoto = document.querySelector('.ad-form-header__preview img');
  var chooserHousing = document.querySelector('.ad-form__upload input[type=file]');
  var previewHousing = document.querySelector('.ad-form__photo');

  // Загружает фотографию 'ВАШУ'
  chooserPhoto.addEventListener('change', function () {
    var file = chooserPhoto.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // Загружает фотографию 'ЖИЛЬЯ'
  chooserHousing.addEventListener('change', function () {
    var file = chooserHousing.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        previewHousing.appendChild(img);
        img.style.width = '70px';
        img.style.height = '70px';
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
