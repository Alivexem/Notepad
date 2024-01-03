/* AlivexemTech... feel free to Duplicate this code*/


document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    loader.style.display = "block"; 

    window.addEventListener("load", function () {
      loader.style.display = "none"; 
    });
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    savedNotes.forEach((noteData) => {
        addNoteToDOM(noteData.title, noteData.main,noteData.createdAt);
    });
});

let date = new Date().getHours();
const greeting = document.getElementById("greeting");

if (date < 12) {
    greeting.innerText = "Welcome... Good morning!";
} else if (date >= 12 && date < 17) {
    greeting.innerText = "Welcome... Good afternoon!";
} else {
    greeting.innerText = "Welcome... Good evening!";
}

let arr = ["gray", "snow"];
let start = 0;
setInterval(() => {
    let index = (start + 1) % arr.length;
    greeting.style.color = arr[index];
    start++;
}, 700);

let announce = document.getElementById("announce");

announce.style.display = "none"
let image = document.getElementById("oops");
let line = document.getElementById("h3");
line.style.display = "none";

let edit = document.getElementById("editbtn");
closebtn = document.getElementById("closebtn");
let close = document.getElementById("close");
close.style.display = "none";
let heading = document.getElementById("heading");
heading.style.display = "none";
let note = document.getElementById("note");

const refresh = document.getElementById("refresh");



const save = document.getElementById("save");

const list = document.getElementById("list");
let show = document.getElementById("show");
show.style.display = "none";


let duplicate = false 
let noteData;
let current;
save.addEventListener("click", () => {
    let title = document.getElementById("title").value;
    let main = document.getElementById("main").value;
    if (title.trim() == "" || main.trim() == "") {
        alert("Please fill up the fields before saving");
        return;
    }
    if (title.length > 25) {
        alert("Note title should be less than 25 characters");
        return;
    }
    if (main.length > 550) {
        alert("Notes can't exceed 550 characters");
        return;
    }
    image.style.display = "none";
    heading.style.display = "block";
    current = new Date().toString()
    noteData = {
      title: title,
      main: main,
      createdAt: current
    };
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

   
    let existingNoteIndex = savedNotes.findIndex((note) => note.title === title);
    if (existingNoteIndex !== -1) {
       
        duplicate = true
        savedNotes[existingNoteIndex] = noteData;
        
    } else {
       
        duplicate = false
        savedNotes.push(noteData);
    }

    localStorage.setItem("notes", JSON.stringify(savedNotes));

    addNoteToDOM(title, main);
    if (duplicate) {
       
        window.location.href = window.location.pathname;
        window.location.reload();
    }
    document.getElementById("title").value = "";
    document.getElementById("main").value = "";
});

function addNoteToDOM(title, main, createdAt) {
    let div = document.createElement("div");
    let secdiv = document.createElement("div")
   
    let text = document.createElement("h3");
    
    text.innerText = `READ: ${title}`;
    text.style.color = "#00aaff"
    text.style.paddingLeft = "10px"
    div.classList.add("block");
    
    secdiv.classList.add("secblock");
    text.classList.add("text");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt", "fa-lg");
    deleteIcon.style.color = "red"
    deleteIcon.style.fontSize = "24px"
    deleteIcon.classList.add("delete");
    deleteIcon.style.marginLeft = "70px"
    deleteIcon.style.paddingRight = "25px"
    
    let recordText = document.createElement("tt")
    recordText.innerText = `Created at: ${createdAt !== undefined ? createdAt : new Date()}`;

   
  
    let linebreak = document.createElement("br")
    recordText.style.color = "white"
    recordText.style.paddingBottom = "10px"
    recordText.style.paddingTop = "10px"
    recordText.style.paddingLeft = "10px"
    recordText.style.paddingRight = "10px"
    recordText.style.fontSize = "10px"
    
    secdiv.append(text)
    secdiv.append(deleteIcon)
    div.append(secdiv)
    div.append(recordText)
    
    list.append(div);
    if(title){
      image.style.display = "none";
      heading.style.display = "block";
    }
    

    deleteIcon.addEventListener("click", (e) => {
      let decision = confirm(`Are you sure you want to delete ${title} note?`);

      if (decision) {
        let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        let noteIndex = savedNotes.findIndex((note) => note.title === title);

        if (noteIndex !== -1) {
          savedNotes.splice(noteIndex, 1);
          localStorage.setItem("notes", JSON.stringify(savedNotes));
        }

    
        div.remove()
    
        if (list.innerText === "") {
          show.style.display = "none";
          heading.style.display = "none";
          close.style.display = "none";
          image.style.display = "flex";
          line.style.display = "none";
        }
      }
    });
    text.addEventListener("click", () => {
        show.innerText = ""
        let topic = document.createElement("h4")
        topic.innerText = "TITLE:"
        topic.style.fontWeight = "bold"
        topic.style.textDecoration = "underline"
        
        let note = document.createElement("h4")
        note.innerText = "NOTE:"
        note.style.fontWeight = "bold"
        note.style.textDecoration = "underline"
        show.append(topic, title, note, main)
        show.style.display = "block";
        close.style.display = "block";
        line.style.display = "block";
        window.location.hash = "#show"
    });
    closebtn.addEventListener("click", () => {
      show.style.display = "none";
      close.style.display = "none";
      line.style.display = "none";
    });

    editbtn.addEventListener("click",() => {
      announce.style.display = "block"
      document.getElementById("title").value = title
      document.getElementById("main").value = main
      show.style.display = "none";
      close.style.display = "none";
      line.style.display = "none";
      setTimeout(() => {
        announce.style.display = "none"
      },5000)
      window.location.hash = "#greeting"
    })
    
}

refresh.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = window.location.pathname;
    window.location.reload();
});