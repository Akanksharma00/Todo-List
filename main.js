const submitBtn = document.querySelector('#submit-btn');
const input = document.querySelector('#form-input');
const list = document.querySelector('.tasks');
const searchBtn = document.querySelector('#search-btn');

submitBtn.addEventListener('click',addItem);
list.addEventListener('click',deleteItem);
list.addEventListener('click',editItem);
searchBtn.addEventListener('click',searchItem);

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
        //Checks if no edit form is present then create a edit form  
        if(!item.lastElementChild.classList.contains('edit-form')){
            //create edit form
            const editForm = document.createElement('form');
            //create input field
            const editText = document.createElement('input');
            editText.setAttribute('class','editText');
            //Adding value to be edited in input field
            editText.setAttribute('value',e.target.parentElement.firstChild.textContent);
            
            //create change button
            const changeBtn = document.createElement('button');
            // changeBtn.textContent = 'Change';
            changeBtn.setAttribute('class','change-btn');

            //create cancel button
            const cancelBtn = document.createElement('button');
            // cancelBtn.textContent = 'Cancel';
            cancelBtn.setAttribute('class','cancel-btn');

            editForm.appendChild(editText);
            editForm.appendChild(changeBtn);
            editForm.appendChild(cancelBtn);
            editForm.className = 'edit-form';
            e.target.parentElement.appendChild(editForm);

            item.addEventListener('click',changeValue);
            item.addEventListener('click',cancelChange); 
        }       
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

//Search Item
function searchItem(e){
    e.preventDefault();
    let searchString = document.querySelector('#search-input').value.toLowerCase();
    let listItems = document.querySelectorAll('li');
    Array.from(listItems).forEach(function(item){
        // console.log(item);
        const itemName = item.firstChild.textContent;
        //indexOf() - returns the first occurance of substring 
        if(itemName.toLowerCase().indexOf(searchString) != -1){
            console.log('match');
            item.style.display = 'block';
        }else{
            console.log('not matched');
            item.style.display = 'none';
        }
    });
}