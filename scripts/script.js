const elementEditButton = document.querySelector('.profile-info__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseElement = document.querySelector('.popup__close');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#activity');

const mainName = document.querySelector('.profile-info__title');
const mainTitle = document.querySelector('.profile-info__subtitle');

const formElement = document.querySelector('.popup__form');

const elementHeart = document.querySelectorAll('.element__heart');

let opened = () => {
    popupElement.classList.add('popup_opened');
    nameInput.value = mainName.textContent; 
    jobInput.value = mainTitle.textContent; 
}

let closed = () => {
    popupElement.classList.remove('popup_opened');
}

elementEditButton.addEventListener('click', opened);
popupCloseElement.addEventListener('click', closed);


function handleFormSubmit (evt) {
    evt.preventDefault();
    
    mainName.textContent = nameInput.value;
    mainTitle.textContent = jobInput.value;

    closed();
}

formElement.addEventListener('submit', handleFormSubmit);

let elementActive = (event) => {
    event.target.classList.toggle('element__heart_active');
}

// Проходимся по каждому элементу и добавляем обработчик событий
elementHeart.forEach((element) => {
    element.addEventListener('click', elementActive);
});

