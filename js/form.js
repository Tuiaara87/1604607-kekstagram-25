import { validateHashTag } from './validation.js';
import { isFocused } from './util.js';
import { changeImageScale } from './edit-image.js';
const imgPreview = document.querySelector('.img-upload__preview');
const uploadFile = document.querySelector('#upload-file');
const imgOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const commentField = document.querySelector('.text__description');
const hashTag = document.querySelector('.text__hashtags');
const uploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
// const uploadSubmit = document.querySelector('.img-upload__submit');
// const downloadErros = document.querySelector('#error');
// const downloadSuccess = document.querySelector('#success');
const IMAGE_SCALE_STEP = 25;
const MIN_IMAGE_SCALE = 25;
const MAX_IMAGE_SCALE = 100;

uploadFile.addEventListener('change', () => {
  imgOverlay.classList.remove('hidden');  //открыла форму
  document.body.classList.add('modal-open');
  imgUploadEffectLevel.classList.add('hidden');
  let imageScale = 100;
  hashTag.addEventListener('input', (evt) => {
    hashTag.setCustomValidity('');
    const validationResult = validateHashTag(evt.target.value);
    if (validationResult && validationResult.length) {
      hashTag.setCustomValidity(validationResult[0]);
      hashTag.reportValidity();
    }
  });

  document.addEventListener('keyup', (evt) => { // закрыла форму клавишей esc
    if (evt.key === 'Escape' && !isFocused(commentField) && !isFocused(hashTag)) {
      imgOverlay.classList.add('hidden');
    }
  });

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  scaleControlSmaller.addEventListener('click', () => {
    if (imageScale <= MIN_IMAGE_SCALE) {
      return;
    }
    changeImageScale(imageScale -= IMAGE_SCALE_STEP);
  });
  scaleControlBigger.addEventListener('click', () => {
    if (imageScale >= MAX_IMAGE_SCALE) {
      return;
    }
    changeImageScale(imageScale += IMAGE_SCALE_STEP);
  });
});


uploadCancel.addEventListener('click', () => {
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgPreview.style = '';
  imgPreview.className = 'img-upload__preview';
});

// uploadSubmit.addEventListener('submit', () => {
//   // все данные из формы(imgOverlay), включая изображения,
//   // с помощью AJAX-запроса отправляются на сервер
//   // https://25.javascript.pages.academy/kekstagram методом POST с типом multipart/form-data.
//   // На время выполнения запроса к серверу кнопка «Отправить» блокируется.
//   // const createLoader = (onSuccess, onError) => fetch(
//   //   'https://25.javascript.pages.academy/kekstagram',
//   //   {
//   //     method: 'POST',
//   //     type: 'multipart/form-data',
//   //     credentials: 'same-origin',
//   //   },
//   // )
//   //   .then((response) => {
//   //     if (response.ok) {
//   //       return response.json();
//   //     }
//   //     throw new Error(`${response.status} ${response.statusText}`);
//   //   })
//   //   .then((data) => {
//   //     onSuccess(data);
//   //   })
//   //   .catch((err) => {
//   //     onError(err);
//   //   });
// });
// // imgOverlay.addEventListener('submit', () => {
// //   // if (uploadForm отправилась) {
// //     document.addEventListener('keyup', (evt) => { // закрыла форму клавишей esc
// //         imgOverlay.classList.add('hidden');
// //       };

// //     );
// //   }
// // });
// // При успешной отправке формы форма редактирования изображения закрывается,
// // все данные, введённые в форму, и контрол фильтра приходят в исходное состояние:
// // масштаб возвращается к 100%;
// // эффект сбрасывается на «Оригинал»;
// // поля для ввода хэш-тегов и комментария очищаются;
// // поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается
// // Если отправка данных прошла успешно, показывается соответствующее сообщение.
// // Разметку сообщения, которая находится в блоке #success внутри шаблона template,
// // нужно разместить перед закрывающим тегом </body>.
// // Сообщение должно исчезать после нажатия на кнопку .success__button,
// //  по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.


// // Если при отправке данных произошла ошибка запроса,
// // нужно показать соответствующее сообщение.
// // Разметку сообщения, которая находится в блоке #error внутри шаблона template,
// // нужно разместить перед закрывающим тегом </body>.
// // Сообщение должно исчезать после нажатия на кнопки .error__button,
// // по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.
