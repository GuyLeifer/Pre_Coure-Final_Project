const ul = document.createElement('ul');
ul.setAttribute('id', 'ul');
const section = document.querySelector('.view');
section.appendChild(ul);
let input = document.querySelector('input[type="text"]');
const AButton = document.getElementById('addButton');

// counter 
var counter = 0;
let counterSpan = document.getElementById('counter');
var completeCounter = 0;

// sort
const SButton = document.getElementById('sortButton');

AButton.addEventListener('click', function(){
    if (input.value!=="") {
        // create li with main div with 3 divs.
        let li = document.createElement('li');
        li.setAttribute("class", "draggable");
        li.setAttribute('draggable', "true");
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
        let hour = d.getHours();
        let minute = d.getMinutes();
        let second = d.getSeconds();
        //set the time to normal SQL format of time
        for (let i=0; i<10; i++){
            if (hour === i) {
                hour = "0"+i;
            }
            if (minute === i) {
                minute = "0"+i;
            }
            if (second === i) {
                second = "0"+i;
            }
        }
        let sqlTime = hour + ":" + minute + ":" + second;
        let sqlDate = d.toISOString().slice(0,10);
        let sql = sqlDate + " " + sqlTime;
        date.textContent = sql;
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
        li.appendChild(label);
        li.appendChild(check);
        let complete = document.getElementById("complete");
        // check functions
            check.addEventListener('click', function(){
            if (check.checked === true) {
                check.parentNode.firstChild.setAttribute("class", "checked");
                completeCounter++;
                complete.textContent = completeCounter + " completed! (at all)";
            }
            else {
                check.parentNode.firstChild.setAttribute("class", "todoContainer");
                completeCounter--;
                complete.textContent = completeCounter + " completed! (at all)";
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
            p.setAttribute('id', 'Rsure');
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
    //local storage
    lStorage();
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
    //local storage
    lStorage();
});

    //search bar
const searchBar = document.getElementById('search');
searchBar.addEventListener('keyup', function(e){
    const term = e.target.value.toLowerCase();
    const searchDiv = ul.getElementsByTagName('li');
    Array.from(searchDiv).forEach(function(div) {
        const title = div.firstChild.textContent;
        if (title.toLowerCase().indexOf(term) != -1) {
            div.style.display = 'block';
        }
        else {
          div.style.display = 'none'; 
        }
    })
});

//remove all button
let remove = document.getElementById("removeButton");
remove.addEventListener('click', function() {
        const p = document.createElement('p');
        p.setAttribute('id', 'Reallysure');
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
        var control = document.querySelector(".control");
        console.log(control);
        control.appendChild(p);
        // sure and not sure buttons
        sure.addEventListener('click', function(e){
            while (ul.hasChildNodes()) {
                ul.removeChild(ul.lastChild);
            }
            const liper = e.target.parentElement;
            liper.parentNode.parentNode.removeChild(p);
            //don't forget the counter
            counter = 0;
            counterSpan.textContent= counter;
        });
        notSure.addEventListener('click', function(e){
            const liper = e.target.parentElement;
            liper.parentNode.parentNode.removeChild(p);
        });  
    });
        

let taskCounter;
// check the last local storage
window.onload = () => {
    if (localStorage.getItem("Task") !== null) {
        document.getElementsByClassName("todoContainer").innerHTML = localStorage.getItem("Task");
    }
    if (localStorage.getItem("Counter") !== null) {
    counter = Number(localStorage.getItem("Counter"));
    taskCounter = counter;
    } 
    else {
    counter = 0;
    }
}


//Local Storage
function lStorage() {
    localStorage.clear();
    localStorage.setItem("Task", document.querySelector(".todoContainer").innerHTML);
    localStorage.setItem("Counter", counter);
    } 


// if someone knows what the problem, it will be AWSOME!

function lStorage() {
    localStorage.clear();
        for (let j = 0; j < ul.childElementCount; j++) {
            var save = ul.childNodes[j].innerHTML;
            console.log(save);
            localStorage.setItem((j + 1) , save);
        } console.log(localStorage); 
    }

// draggable

const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.ul')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
