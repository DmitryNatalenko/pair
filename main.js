// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
const container = document.querySelector('.container');

function createNumbersArray(count) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i + 1, i + 1);
  }

  return arr;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startForm() {
  const beginWrap = document.createElement('div')
  const title = document.createElement('h1');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const btnStart = document.createElement('button');

  title.classList.add('mb-4', 'mt-4');
  form.classList.add('form-group', 'mt-5');
  input.classList.add('form-control', 'col-6', 'mb-4');
  btnStart.classList.add('btn', 'btn-info');

  input.placeholder = 'Количество карточек по вертикали/горизонтали';
  title.textContent = "Пары";
  btnStart.textContent = 'Начать игру';
  btnStart.setAttribute('disabled', true)

  container.append(beginWrap);
  beginWrap.append(title);
  beginWrap.append(form);
  form.append(input);
  form.append(btnStart);


  input.addEventListener('input', () => {
    if (!input.value) {
      btnStart.setAttribute('disabled', true);
    } else {
      btnStart.removeAttribute('disabled');
    }
  });

  const inputValue = () => {
    if (input.value >= 2 && input.value <= 10 && input.value % 2 === 0) {
      return (input.value * input.value / 2);
    } else {
      return 8;
    }
  }

  let timeout;

  btnStart.addEventListener('click', () => {
    input.remove();
    btnStart.remove();
    startGame(inputValue());
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      document.location.reload();
    }, 60000);
  })
}

function startGame(count) {
  const numbersArray = createNumbersArray(count);
  const randomArray = shuffle(numbersArray);
  const cardWrap = document.createElement('div');
  const buttonWrap = document.createElement('div');
  const repeatButton = document.createElement('button');

  repeatButton.classList.add('btn', 'btn-outline-success')
  buttonWrap.classList.add('row', 'justify-content-center', 'mb-5')
  cardWrap.classList.add('row', 'mt-4', 'mb-4');


  for (let i = 0; i < randomArray.length; i++) {
    const card = document.createElement('button');
    const wrapper = document.createElement('div');

    wrapper.classList.add('pr-2', 'pl-2', 'pb-2');
    card.classList.add('bg-secondary', 'btn', 'figure', 'p-3', 'justify-content-center', 'w-100', 'text-white', randomArray[i]);

    card.style = 'font-size: 6rem';
    wrapper.style = `width: calc(100% / ${Math.sqrt(count * 2)})`;
    card.textContent = '#';
    card.setAttribute('data-index', randomArray[i])
    wrapper.append(card);
    cardWrap.append(wrapper);
  }

  container.append(cardWrap);
  container.append(buttonWrap);


  const items = document.querySelectorAll('.figure')
  let arrayClose = [];
  let arrayOpen = [];

  function choiseCard(e) {
    const currentCard = e.currentTarget;
    currentCard.textContent = currentCard.dataset.index;

    arrayClose.push(currentCard.dataset.index)

    if (arrayClose.length <= 2) return

    if (arrayClose[0] !== arrayClose[1]) {
      function findCard () {
        const close = document.getElementsByClassName(arrayClose[0]);
        for (let u = 0; u < close.length; u++) {
          close[u].textContent = '#';
        }
        arrayClose.shift();
      }

      findCard();
      findCard();

      currentCard.textContent = currentCard.dataset.index;
    } else {
      arrayOpen.push(currentCard.dataset.index)
      const open = document.getElementsByClassName(arrayClose[0]);
      for (let k = 0; k < open.length; k++) {
        open[k].setAttribute('disabled', 'disabled');
      }
      arrayClose.shift();
      arrayClose.shift();
    }

    if (arrayOpen.length >= count - 1) {
      repeatButton.textContent = 'Сыграть ещё раз';
      buttonWrap.append(repeatButton);
    }
  }

  repeatButton.addEventListener('click', () => {
    document.location.reload();
  })

  items.forEach(item => {
    item.addEventListener('click', choiseCard)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  startForm();
});

