const ul = document.createElement('ul');
const section = document.querySelector('.view');
section.appendChild(ul);
let input = document.querySelector('input[type="text"]');
const AButton = document.getElementById('addButton');

// counter 
var counter = 0;
let counterSpan = document.getElementById('counter');

AButton.addEventListener('click', function(){
    if (input.value!=="") {
        // create li with main div with 3 divs.
        let li = document.createElement('li');
        ul.appendChild(li);
        div = document.createElement('div')
        div.className = "todoContainer";
        li.appendChild(div);
        let priority = document.createElement('div');
        priority.className = "todoPriority";
        let date = document.createElement('div');
        date.className = "todoCreatedAt";
        let text = document.createElement('div');
        text.className = "todoText";
        div.appendChild(priority);
        div.appendChild(date);
        div.appendChild(text);
        
        // set the values of the divs
        priority.textContent = document.getElementById('prioritySelector').value;
        
        //turn the JS date to SQL date
        date.textContent = new Date().toLocaleString();
        text.textContent = input.value;
        // reset the input value after clicking
        input.value = ""; 

        // counter
        counter++;
        counterSpan.textContent= counter;
    }
});
