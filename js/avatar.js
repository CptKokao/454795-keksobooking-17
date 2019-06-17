'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var chooserPhoto = document.querySelector('.ad-form__field input[type=file]');
  var previewPhoto = document.querySelector('.ad-form-header__preview img');
  var chooserHousing = document.querySelector('.ad-form__upload input[type=file]');
  var previewHousing = document.querySelector('.ad-form__photo');

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

  chooserHousing.addEventListener('change', function () {
    var file = chooserHousing.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement("img");
        previewHousing.appendChild(img);
        img.style.width = '70px';
        img.style.height = '70px';
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // var dropeZone = document.querySelector('.ad-form-header__drop-zone');

  // // курсор мыши наведен на элемент при перетаскивании
  // dropeZone.addEventListener('dragover', function (evt) {
  //   dropeZone.style.border = '2px dashed red';
  //   evt.preventDefault();
  //   return false;
  // });

  // // курсор мыши покидает пределы перетаскиваемого элемента
  // dropeZone.addEventListener('dragleave', function (evt) {
  //   dropeZone.style.border = '';
  //   evt.preventDefault();
  // });

  // // происходит drop элемента.
  // dropeZone.addEventListener('drop', function (evt) {

  //   chooserPhoto.addEventListener('change', function () {
  //     var file = chooserPhoto.files[0];
  //     var fileName = file.name.toLowerCase();

  //     var matches = FILE_TYPES.some(function (it) {
  //      return fileName.endsWith(it);
  //     });

  //     if (matches) {
  //       var reader = new FileReader();

  //       reader.addEventListener('load', function () {
  //         preview.src = reader.result;
  //       });

  //       reader.readAsDataURL(file);
  //     }
  //   });
  // });
})();
