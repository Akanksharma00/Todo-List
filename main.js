const submitBtn = document.querySelector('#submit-btn');
const input = document.querySelector('#form-input');
const list = document.querySelector('.tasks');

submitBtn.addEventListener('click',addItem);
list.addEventListener('click',deleteItem);
list.addEventListener('click',editItem);
list.addEventListener('click',completedTask);

//Add Item
function addItem(e){
    e.preventDefault();
    if(input.value === ''){
        alert("Please enter some value");
    }else{
        //Adding item to list
        const item = document.createElement('li');
        item.textContent = input.value;
        item.className = 'item';

        //Adding edit button for item
        const editBtn = document.createElement('button');
        // editBtn.textContent = 'Edit';
        editBtn.style.backgroundImage = 'editIcon.png';
        editBtn.className = 'edit-btn';
        item.appendChild(editBtn);

        //Adding delete button for item
        const delBtn = document.createElement('button');
        // delBtn.textContent = 'X';
        delBtn.setAttribute('class','del-btn');
        item.appendChild(delBtn);

        list.appendChild(item);
        input.value = '';
    }
}

//Delete Item
function deleteItem(e){
    if(e.target.classList.contains('del-btn')){
        const itemToBeRemoved = e.target.parentElement;
        list.removeChild(itemToBeRemoved);
    }
}

//Edit Item
function editItem(e){
    const item = e.target.parentElement;
    if(e.target.classList.contains('edit-btn')){
        const editForm = document.createElement('form');
        const editText = document.createElement('input');
        editText.setAttribute('class','editText');
        editText.setAttribute('value',e.target.parentElement.firstChild.textContent);
        const changeBtn = document.createElement('button');
        // changeBtn.textContent = 'Change';
        changeBtn.setAttribute('class','change-btn');
        const cancelBtn = document.createElement('button');
        // cancelBtn.textContent = 'Cancel';
        cancelBtn.setAttribute('class','cancel-btn');
        editForm.appendChild(editText);
        editForm.appendChild(changeBtn);
        editForm.appendChild(cancelBtn);
        e.target.parentElement.appendChild(editForm);

        item.addEventListener('click',changeValue);
        item.addEventListener('click',cancelChange);        
    }
}

//Cancel the Edit Value
function cancelChange(e){
    e.preventDefault();
    if(e.target.classList.contains('cancel-btn')){
        e.target.parentElement.remove(e.target.parentElement);
    }
}

//Change Value
function changeValue(e){
    e.preventDefault();
    const form = e.target.parentElement;
    const listItem = e.target.parentElement.parentElement;
    if(e.target.classList.contains('change-btn')){
        listItem.firstChild.textContent = form.firstChild.value;
        form.remove(form);
    }
}
