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
        //Adding items to localStorage
        // localStorage.setItem(input.value,input.value); 
        
        let obj = {
            'task': input.value
        }

        axios.post('https://crudcrud.com/api/fb7e154af6a54ba191521391703cdb1c/taskList',obj)
            .then(res => {
                showTask(res.data);
                // console.log(res.data);
            })
            .catch(err =>{
                document.querySelector('.err-div').style.display = 'block';
                setTimeout( e =>{
                    document.querySelector('.err-div').style.display = 'none';
                },5000);
                console.log(err);
            });
    }
}

function showTask(data){
    //Adding item to list
    const item = document.createElement('li');
    item.textContent = data.task;
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

//Delete Item
function deleteItem(e){
    if(e.target.classList.contains('del-btn')){
        const itemToBeRemoved = e.target.parentElement;
        const val = itemToBeRemoved.firstChild.textContent;
        
        axios.get('https://crudcrud.com/api/fb7e154af6a54ba191521391703cdb1c/taskList')
            .then(res => {
                const taskList = res.data;
                taskList.forEach((t)=>{
                    if(val === t.task){
                        const id = t._id;
                        axios.delete('https://crudcrud.com/api/fb7e154af6a54ba191521391703cdb1c/taskList/'+id)
                            .then(res => list.removeChild(itemToBeRemoved))
                            .catch(err => console.log(err));
                    }
                })
            })
            .catch(err => console.log(err));

        //Deleting from localStorage
        // localStorage.removeItem(e.target.parentElement.firstChild.textContent);
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
    let val = listItem.firstChild.textContent;
    
    if(e.target.classList.contains('change-btn')){
        axios.get('https://crudcrud.com/api/fb7e154af6a54ba191521391703cdb1c/taskList')
            .then(res => {
                const taskList = res.data;
                taskList.forEach((t)=>{
                    if(t.task === val){
                        const id = t._id;
                        axios.put('https://crudcrud.com/api/fb7e154af6a54ba191521391703cdb1c/taskList/'+id,{
                            task: form.firstChild.value
                        })
                            .then(res => {
                                listItem.firstChild.textContent = form.firstChild.value;
                                form.remove(form);
                            })
                            .catch(err => console.log(err));
                    }
                })
            })


        //Update value in localStorage
        // localStorage.removeItem(listItem.firstChild.textContent);
        // localStorage.setItem(form.firstChild.value,form.firstChild.value);

        //updating value in front-end
        // listItem.firstChild.textContent = form.firstChild.value;
        // form.remove(form);
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

// console.log(Object.keys(localStorage))

// read content from localStorage on page refresh
// document.addEventListener('DOMContentLoaded',(e)=>{
//     e.preventDefault();
//     const items = Object.keys(localStorage);
//     items.forEach((i)=>{
//         //Adding item to list
//         const item = document.createElement('li');
//         item.textContent = i;
//         item.className = 'item';

//         //Adding edit button for item
//         const editBtn = document.createElement('button');
//         editBtn.style.backgroundImage = 'editIcon.png';
//         editBtn.className = 'edit-btn';
//         item.appendChild(editBtn);

//         //Adding delete button for item
//         const delBtn = document.createElement('button');
//         delBtn.setAttribute('class','del-btn');
//         item.appendChild(delBtn);

//         list.appendChild(item);
//     });
// });

//read content from api on page refresh
document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    axios.get('https://crudcrud.com/api/fb7e154af6a54ba191521391703cdb1c/taskList')
        .then(res => {
            const item = res.data;
            item.forEach((i)=>{
                showTask(i);
            })
        })
        .catch(err => console.log(err));
})





