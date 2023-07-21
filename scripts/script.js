const elementEditButton = document.querySelector('.profile-info__edit-button');

const popupElement = document.querySelector('.popup');

const popupCloseElement = document.querySelector('.popup__close');

let opened = () => {
    popupElement.classList.toggle('popup_opened');
}

elementEditButton.addEventListener('click', opened);
popupCloseElement.addEventListener('click', opened);


let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__title');

let mainName = document.querySelector('.profile-info__title');
let mainTitle = document.querySelector('.profile-info__subtitle');


function handleFormSubmit (evt) {
    evt.preventDefault();
    
    mainName.textContent = nameInput.value;
    mainTitle.textContent = jobInput.value;

    opened();
}

let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit);


const elementHeart = document.querySelectorAll('.element__heart');

let elementActive = (event) => {
    event.target.classList.toggle('element__heart_active');
}

// Проходимся по каждому элементу и добавляем обработчик событий
elementHeart.forEach((element) => {
    element.addEventListener('click', elementActive);
});

