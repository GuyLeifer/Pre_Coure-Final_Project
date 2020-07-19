const ul = document.createElement('ul');
const section = document.querySelector('.view');
section.appendChild(ul);
let input = document.querySelector('input[type="text"]');
const AButton = document.getElementById('addButton');

// counter 
var counter = 0;
let counterSpan = document.getElementById('counter');

// sort
const SButton = document.getElementById('sortButton');

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
            
            
            // delete button
            const btn = document.createElement('button');
            btn.setAttribute('class', 'btn');
            btn.textContent = "Delete";
            li.appendChild(btn);

            //btn delete function
            btn.addEventListener('click', function(){
                const p = document.createElement('p');
                p.textContent = "Are you SURE?"
                const spann = document.createElement('span');
                const sure = document.createElement('button');
                sure.className = "sureButton";
                const notSure = document.createElement('button');
                notSure.className = "notSureButton";
                sure.style.backgroundColor = "rgba(115, 216, 123, 0.952)";
                sure.style.Color = "white";
                sure.textContent = "Yes";
                notSure.textContent = "No";
                notSure.style.backgroundColor = "red";
    
                p.appendChild(spann);
                spann.appendChild(sure);
                spann.appendChild(notSure);
                li.appendChild(p);
    
                // sure and not sure buttons
                sure.addEventListener('click', function(e){
                  const lip = e.target.parentElement;
                  lip.parentNode.parentNode.parentNode.removeChild(li);
                  //don't forget the counter if deleted item
                  counter--;
                  counterSpan.textContent= counter;

                });
    
                notSure.addEventListener('click', function(e){
                  const lipe = e.target.parentElement;
                  lipe.parentNode.parentNode.removeChild(p);
                });
            });
            }});

    // sort button
    SButton.addEventListener('click', function() {
        var list, i, switching, b, shouldSwitch;
        switching = true;
        while (switching) {
            switching = false;
            b = ul.getElementsByClassName("todoPriority");
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (b[i].textContent < b[i + 1].textContent) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
            b[i].parentNode.parentNode.parentNode.insertBefore(b[i + 1].parentNode.parentNode, b[i].parentNode.parentNode);
            switching = true;
            }
        }
    });