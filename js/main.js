const engWord = document.getElementById('eng'),
    someWord = document.getElementById('some'),
    inputs = document.getElementsByClassName('input'),
    addButton = document.getElementById('add-word-btn'),
    table = document.getElementById('table');

let words,
    btnDelete;

// const word = {
//     english : '',
//     someLanguage : ''
// }

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = index => {
    table.innerHTML += `
    <tr class="tr">
    <td class="eng-word">${words[index].english}</td>    
    <td class="some-word">${words[index].someLanguage}</td>  
    <td>
    <button class="btn-delete"></button>    
    </td>
    </tr>
    `
}
words.forEach((element, i) => {
    addWordToTable(i);
});


function CreateWord(english, someLanguage) {
    this.english = english;
    this.someLanguage = someLanguage;
}

addButton.addEventListener('click', () => {
    if (
        engWord.value.length < 1 ||
        someWord.value.length < 1 ||
        !isNaN(engWord.value) ||
        !isNaN(someWord.value)
    ) {
        for (let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for (let key of inputs) {
            key.classList.remove('error');
        }
        words.push(new CreateWord(engWord.value, someWord.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        engWord.value = null;
        someWord.value = null;
        addEventDelete();
    }
})





const deleteWord = e => {
    // console.log(e.target);
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));

}
const addEventDelete = () => {
    if (words.length > 0) {
        btnDelete = document.querySelectorAll('.btn-delete');
        for (let btn of btnDelete) {
            btn.addEventListener('click', e => {
                deleteWord(e);
            })
        }
    }
}
addEventDelete();