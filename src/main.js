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
            li.setAttribute("class", "draggable");
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
            let d = new Date();
            let wDate = d.toISOString().replace("T"," ");
            let regex = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/;
            let sqlTime = wDate.match(regex)[0];
            date.textContent = sqlTime;
            text.textContent = input.value;
            // reset the input value after clicking
            input.value = ""; 
            
            // counter
            counter++;
            counterSpan.textContent= counter;
            
            // done / not yet
            let label = document.createElement("label");
            label.setAttribute("for", "checkbox");
            label.setAttribute("class", "checkbox2");
            label.textContent = "Done?";
            let check = document.createElement("input");
            check.setAttribute("type", "checkbox");
            check.setAttribute("class", "checkbox");
            check.setAttribute("id", "checkbox");
            check.textContent = "Done/not?";
            li.appendChild(label);
            li.appendChild(check);

            // check functions
            check.addEventListener('click', function(){
                if (check.checked === true) {
                    check.parentNode.firstChild.setAttribute("class", "checked");
                }
                else {
                    check.parentNode.firstChild.setAttribute("class", "todoContainer");
                }

            });
           
            // delete button
            const btn = document.createElement('button');
            btn.setAttribute('class', 'btn');
            const gar = document.createElement('img');
            gar.setAttribute("src", "https://cdn2.iconfinder.com/data/icons/database-server-and-location/64/74-512.png");
            gar.setAttribute("width", "18");
            gar.setAttribute("height", "25");
            gar.setAttribute("alt", "delete");
            btn.appendChild(gar);
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
        }
    });

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








