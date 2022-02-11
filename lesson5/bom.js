const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('ul');

const addChapter = () => {
    enteredText = input.value;
    if (input.value !== '') {
        input.value = '';
        const listItem = document.createElement('li');
        const btn = document.createElement('button');
        listItem.innerHTML = enteredText;
        btn.textContent = 'X';
        listItem.appendChild(btn);
        list.appendChild(listItem);
        btn.addEventListener('click', function(){
            list.removeChild(listItem);
            input.focus();
        });
    }
    input.focus();
}
button.addEventListener('click', addChapter)