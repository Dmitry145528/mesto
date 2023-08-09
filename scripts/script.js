const cardContainer = document.querySelector('.elements__grid-items'); // Место куда рендерим карточки
const cardTemplate = document.querySelector('.card-template').content; // Получаем доступ к темплейт тегу, а точнее к его содержимому

const popupEditForm = document.querySelector('#popup_edit-profile'); // Получаем доступ к попапу для ред. профиля 
const popupAddForm = document.querySelector('#popup_add-card'); // Получаем доступ к попапу для созд. карточек
const popupImgForm = document.querySelector('#popup_image'); // Получаем доступ к попапу для дет. просмотра карточки

const elementEditButton = document.querySelector('.profile-info__edit-button'); // Получаем доступ к кнопке ред. профиля
const elementAddButton = document.querySelector('.profile__addbutton'); // Получаем доступ к кнопке созд. карточек

const editProfileCloseButton = popupEditForm.querySelector('.popup__close'); // Получаем доступ к кнопке закрытия попапа для ред. профиля
const addCardCloseButton = popupAddForm.querySelector('.popup__close'); // Получаем доступ к кнопке закрытия попапа для созд. карточек
const imgCardCloseButton = popupImgForm.querySelector('.popup__close'); // Получаем доступ к кнопке закрытия попапа для дет. просмотра карточки

const nameInput = popupEditForm.querySelector('#name'); // Получаем доступ к вводу имени в профиле
const jobInput = popupEditForm.querySelector('#activity'); // Получаем доступ к вводу деятельности в профиле
const titleInput = popupAddForm.querySelector('#title'); // Получаем доступ к вводу названия добавляемой карточки 
const imgInput = popupAddForm.querySelector('#img-url'); // Получаем доступ к вводу картинки добавляемой карточки 

const mainName = document.querySelector('.profile-info__title'); // Получаем доступ к уже введённому имени
const mainTitle = document.querySelector('.profile-info__subtitle'); // Получаем доступ к уже введённой деятельности

// Функция генерации карточек
function createCards() {
  const reverseArray = initialCards.reverse();
  reverseArray.forEach(renderInitialCards);
}

// Функция для изменения лайка
const changingHeartElement = (evt) => {
  evt.target.classList.toggle('element__heart_active');
}

// Функция для удаления карточки
function deleteCard (evt){
  const currentItem = evt.target.closest('.element'); // получаем родителя кнопки
  currentItem.remove();
}


// Функция для генерации карточек и их функциональности 
function renderInitialCards (item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  if (item.link == '') {
    item.link = 'https://sun9-52.userapi.com/impg/rwuKgkkpRnDQYDx56xO9Kc9KKMkKNKZUxC2BsQ/UGG81lHQNeI.jpg?size=898x594&quality=96&sign=4f363299df63fdff53381468eee50134&c_uniq_tag=B7AMEwk0IsNlkyCjQ77bzDwSGi68fyS5aOHElmk9dXA&type=album';
  }
  cardElement.querySelector('.element__img').src = item.link;
  if (item.name == '') {
    item.name = 'Пустая карточка';
  }
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__img').alt = item.name;
  
  cardContainer.prepend(cardElement);

  const elementHeart = document.querySelectorAll('.element__heart');
  const elementDelete = document.querySelectorAll('.element__trash');
  const elementImgButton = document.querySelector('.element__img');

  // Проходимся по каждому элементу и добавляем обработчик событий на детальный просмотр
  elementImgButton.addEventListener('click', () => {
    openPopupImgForm(popupImgForm, item);
  });

      // Проходимся по каждому элементу и добавляем обработчик событий на лайк
  elementHeart.forEach((element) => {
    element.addEventListener('click', changingHeartElement);
  });

      // Проходимся по каждому элементу и добавляем обработчик событий на корзину
  elementDelete.forEach((element) => {
    element.addEventListener('click', deleteCard);
  });

  return cardElement;
}
  
// Вызываем функцию createCards, чтобы отобразить карточки на странице
createCards();



// Функция для открытия попапа "Редактировать профиль"
function openPopupEditForm() {
  nameInput.value = mainName.textContent; 
  jobInput.value = mainTitle.textContent;
  popupEditForm.classList.add('popup_opened');
}

// Функция для открытия попапа "Новое место"
function openPopupAddForm() {
  popupAddForm.classList.add('popup_opened');
}

// Функция для открытия попапа "Детального просмотра"
function openPopupImgForm(popupElement, item) {
  const popupImg = popupElement.querySelector('.popup__image');
  const popupCaption = popupElement.querySelector('.popup__caption');
  popupElement.setAttribute('style', 'background-color: rgba(0,0,0,.9);');

  popupImg.src = item.link;
  popupImg.alt = item.name;
  popupCaption.textContent = item.name;

  popupElement.classList.add('popup_opened');
}

// Функция для отправки формы "Редактировать профиль"
function submitEditProfileForm (evt) {
  evt.preventDefault();
  
  mainName.textContent = nameInput.value;
  mainTitle.textContent = jobInput.value;

  closePopup(popupEditForm);
}

// Функция для отправки формы "Новое место"
function submitAddCardForm(evt) {
  evt.preventDefault();

  // Получаем значения из формы
  const nameValue = titleInput.value;
  const imgValue = imgInput.value;

  // Создаем новый объект с данными из формы
  const newCard = {
    name: nameValue,
    link: imgValue,
  };

  // Добавляем новый объект в массив initialCards
  initialCards.unshift(newCard);

  // Отображаем новую карточку на странице
  renderInitialCards(newCard);

  // После добавления карточки в массив обнуляем значения полей
  titleInput.value = '';
  imgInput.value = '';

  // Закрываем попап
  closePopup(popupAddForm);
}

// Общая функция закрытия
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}



// Слушатель для открытия попапа "Редактировать профиль"
elementEditButton.addEventListener('click', openPopupEditForm);

// Слушатель для открытия попапа "Новое место"
elementAddButton.addEventListener('click', openPopupAddForm);

// Слушатель для закрытия попапа "Редактировать профиль"
editProfileCloseButton.addEventListener('click', function() {
  closePopup(popupEditForm);
});

// Слушатель для закрытия попапа "Новое место"
addCardCloseButton.addEventListener('click', function() {
  closePopup(popupAddForm);
});

// Слушатель для закрытия попапа "Детальный просмотр"
imgCardCloseButton.addEventListener('click', function() {
  closePopup(popupImgForm);
});

// Слушатель для отправки формы "Редактировать профиль"
popupEditForm.addEventListener('submit', submitEditProfileForm);

// Слушатель для отправки формы "Новое место"
popupAddForm.addEventListener('submit', submitAddCardForm);