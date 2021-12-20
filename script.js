let operations = {
     91100 : {
        name : 'Интеграция товара LR на склад',
        initial : 411,
    },
    91109 : {
        name : 'Интеграция КГТ LR на склад',
        initial : 154,
    },
    91108 : {
        name : 'Интеграция товара LR через ручной ввод',
        initial : 366,
    },
    91110 : {
        name : 'Набор товара LR со склада',
        initial : 182,
    },
    91127 : {
        name : 'Переупаковка товара LR',
        initial : 94,
    },
    91150 : {
        name : 'Набор КГТ со склада LR',
        initial : 55,
    },
    80603 : {
        name : 'Переупаковка товаров Puma',
        initial : 171,
    },
    80603 : {
        name : 'Переупаковка товаров Puma',
        initial : 171,
    },
    87602 : {
        name : 'Сканирование товара Puma при приемке товара',
        initial : 522,
    },
    87610: {
        name : 'Размещение товара Puma на склад',
        initial : 361,
    },
    87621: {
        name : 'Набор товара Puma со склада по этикеткам',
        initial : 88,
    },
    87622: {
        name : 'Набор товара Puma со склада по инвойсам',
        initial : 72,
    },
    82005: {
        name : 'Набор товара для отгрузки заказов от филиалов DeFacto',
        initial : 28,
    },
    82010: {
        name : 'Сканирование товара для отгрузки в филиалы (мелкий товар) DeFacto',
        initial : 397,
    },
    82012: {
        name : 'Сканирование товара для отгрузки в филиалы (крупный товар) DeFacto',
        initial : 57,
    },
    82030: {
        name : 'Размещение товара с поставок коробами DeFacto',
        initial : 74,
    },
    82031: {
        name : 'Размещение товара с поставок лотами DeFacto',
        initial : 115,
    },
};

//outs
let outGeneral = document.querySelector('.out_result');

// buttons
const b1 =  document.querySelector('.b-1').addEventListener('click', addForm),
    buttonMenu =  document.querySelector('.button__menu'),
    buttonMenuClose = document.querySelector('.button__menu--close').addEventListener('click', closeMenu),
    menuList = document.querySelector('.menu');
//
const operationList = document.querySelector('.form__list'),
    operationItems = document.querySelector('.operation__items');
    


let selectOperation = [],
    n = 0;

for ( let key in operations ) {
    operationList.insertAdjacentHTML("afterbegin", `
    <div>
        <input class="checkbox" type="checkbox" data-key="${key}" id="${key}">
        <label class="label" for="${key}">${key} : ${operations[key]['name']}</label>
    </div>
    `);
}

function labelActive() {
    document.querySelectorAll('.label').forEach( elem => {
        elem.addEventListener('click', () => {
            elem.classList.toggle('label--active');
        })
    });
}
labelActive();

menuVisible();



function menuVisible() {
    buttonMenu.addEventListener('click', () => {
        menuList.classList.toggle('menu--visible');
    });    
}
function menuHidden() {
    menuList.classList.remove('menu--visible');
}
function closeMenu() {
    menuList.classList.remove('menu--visible');
}


function changeTypeResult() {
    this.classList.toggle('button__change--percent');
    this.classList.toggle('button__change--time');
}

function addForm() {
    document.querySelectorAll('.checkbox').forEach( elem => {
        let elemAt = elem.getAttribute('data-key'),
            k = 0;
        
        selectOperation.forEach(item => {
            if (elemAt == item) {
                k = 1;
            }
        });

        if (k != 1 && elem.checked) {
            selectOperation.push(elemAt);
            operationItems.insertAdjacentHTML("afterbegin", `
                <div class="form_items form_${elemAt}">
                    <div class="operation-form_name form__title">${operations[elemAt]['name']}</div>
                    <div class="wrapper__input">
                        <input type="number" class="value_${elemAt} input--block">
                        <input type="text" class="percent_${elemAt} input--block">
                        <button value="${elemAt}" class="button__change-${elemAt} form__button-change button__change--time"></button>
                    </div>
                    <div class="rangeChange_${elemAt}"></div>
                    <div class="out out_${elemAt}" data-result=""></div>
                    <button value="${elemAt}" class="button__result ${elemAt}">Расчет</button>
                    <button value="${elemAt}" class="button__delete-${elemAt} form__button-delete"></button>
                </div>`);
                
            document.querySelectorAll('.button__result').forEach(elem => {
                elem.addEventListener('click', getTime);
            });

            document.querySelector(`.button__change-${elemAt}`).addEventListener('click', changeTypeResult);

            document.querySelector(`.button__delete-${elemAt}`).addEventListener('click', () => {
                removeForm(elemAt);
            });
        }
        
        if (k == 1 && !elem.checked) {
            removeForm(elemAt);
        }
    });
}



function getTime() {
    let num = this.classList[1],
        resAll = 0,
        val = document.querySelector(`.value_${num}`).value,
        range = document.querySelector(`.percent_${num}`).value,
        out = document.querySelector(`.out_${num}`),
        init = operations[num]['initial'],
        time = +((val * 60) / (init * (range/100)));
        // percent = +((60/(range/val)) / init);
        
    if (document.querySelector(`.button__change-${num}`).classList.contains('button__change--percent')) {
        out.innerHTML = `${time.toFixed(5)} %`;     
    }
    else {
        out.innerHTML = `${time.toFixed(1)} мин / ${Math.floor(time.toFixed(1) / 60)} ч ${Math.floor(time.toFixed(1) % 60)} мин`;
    }

    out.setAttribute('data-result', time.toFixed(1));

    document.querySelectorAll('.out').forEach(elem => {
        resAll += +elem.getAttribute('data-result'); 
    });

    outGeneral.innerHTML = resAll;
}

function removeForm(num) {
    let resAll = 0;

    selectOperation.forEach((elem, index)=> {
        if (elem == num) {
            selectOperation.splice(index, 1);
        }
    });

    document.querySelector(`.form_${num}`).remove();
    document.querySelectorAll('.checkbox').forEach( elem => {
        if (elem.getAttribute('data-key') == num) {
            elem.checked = false;
        }
    });

    document.querySelectorAll('.label').forEach( elem => {
        if (elem.getAttribute('for') == num) {
            elem.classList.remove('label--active');
        }
    });

    document.querySelectorAll('.out').forEach(elem => {
        resAll += +elem.getAttribute('data-result'); 
    });

    outGeneral.innerHTML = resAll;
}
