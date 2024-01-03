/* AlivexemTech... feel free to Duplicate this code*/


let date = new Date().getHours();
const greeting = document.getElementById("greeting");

if (date < 12) {
    greeting.innerText = "Welcome... Good morning!";
} else if (date >= 12 && date < 18) {
    greeting.innerText = "Welcome... Good afternoon!";
} else {
    greeting.innerText = "Welcome... Good evening!";
}

let arr = ["gray", "orange"];
let start = 0;
setInterval(() => {
    let index = (start + 1) % arr.length;
    greeting.style.color = arr[index];
    start++;
}, 700);

let image = document.getElementById("oops");
let line = document.getElementById("h3");
line.style.display = "none";

let close = document.getElementById("close");
close.style.display = "none";
let heading = document.getElementById("heading");
heading.style.display = "none";
let note = document.getElementById("note");

const refresh = document.getElementById("refresh");
refresh.addEventListener("click", () => {
    window.location.reload();
});

const save = document.getElementById("save");

const list = document.getElementById("list");
let show = document.getElementById("show");
show.style.display = "none";


document.addEventListener("DOMContentLoaded", () => {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    savedNotes.forEach((noteData) => {
        addNoteToDOM(noteData.title, noteData.main);
    });
    
});

save.addEventListener("click", () => {
    let title = document.getElementById("title").value;
    let main = document.getElementById("main").value;
    if (title.trim() == "" || main.trim() == "") {
        alert("Please fill up the fields before saving");
        return;
    }
    if (title.length > 35) {
        alert("Title should be less than 35 characters");
        return;
    }
    if (main.length > 250) {
        alert("Notes can't exceed 250 characters");
        return;
    }
    image.style.display = "none";
    heading.style.display = "block";


    let noteData = {
        title: title,
        main: main,
    };
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.push(noteData);
    localStorage.setItem("notes", JSON.stringify(savedNotes));

  
    addNoteToDOM(title, main);
    document.getElementById("title").value = ""
    document.getElementById("main").value = ""
});

function addNoteToDOM(title, main) {
    let div = document.createElement("div");
    let button = document.createElement("button");
    let text = document.createElement("h3");
    text.innerText = `OPEN: ${title}`;
    button.innerText = "Delete";
    button.classList.add("delete");
    div.classList.add("block");
    text.classList.add("text");
    div.append(text);
    div.append(button);
    list.append(div);
    if(title){
      image.style.display = "none";
      heading.style.display = "block";
    }

    button.addEventListener("click", (e) => {
      let decision = confirm("Are you sure you want to delete this note?")
      if(decision){
        let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        let noteIndex = savedNotes.findIndex((note) => note.title === title);
        if (noteIndex !== -1) {
          savedNotes.splice(noteIndex, 1);
          localStorage.setItem("notes", JSON.stringify(savedNotes));
        }

   
        e.target.parentNode.remove();

        if (list.innerText == "") {
          show.style.display = "none";
          heading.style.display = "none";
          close.style.display = "none";
          image.style.display = "flex";
          line.style.display = "none";
        }
      }
  });

    text.addEventListener("click", () => {
        show.innerText = `TITLE: \n ${title} \n \n \n NOTE: \n ${main}`;
        show.style.display = "block";
        close.style.display = "block";
        line.style.display = "block";
    });
}

close.addEventListener("click", () => {
    show.style.display = "none";
    close.style.display = "none";
    line.style.display = "none";
});