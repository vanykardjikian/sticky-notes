const board = document.getElementById('board');
const addNoteBtn = board.querySelector('.add-note');
const clearBtn = board.querySelector('.clear');

let count = 0;
let length = getNotes().length;
if (length != 0) {
    count = getNotes()[length - 1].id + 1;
}


// Clear the board
clearBtn.addEventListener('click', () => {
    const deleteCheck = confirm("Are you sure you want to clear the board?");
    if (deleteCheck) {
        while (board.firstElementChild.className == 'note') {
            board.removeChild(board.firstChild);
        }
        saveNotes([]);
    }
})


addNoteBtn.addEventListener('click', () => {
    addNote();
})


// Load notes when page loads
getNotes().forEach(note => {
    createNoteElement(note.id, note.content);
});


// Get all notes from local storage
function getNotes() {
    return JSON.parse(localStorage.getItem("stickyNotes-note") || "[]");
}

// Save new notes in local storage
function saveNotes(notes) {
    localStorage.setItem("stickyNotes-note", JSON.stringify(notes));
}


// Creates a new html element for the note
function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add('note');
    element.placeholder = "Enter note here"
    element.value = content;

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const deleteCheck = confirm("Are you sure you want to delete this note?");
        if (deleteCheck) {
            deleteNote(id, element);
        }
        
    });
    board.insertBefore(element ,addNoteBtn);
}

// Add a new note and save it in the local storage
function addNote() {
    const localNotes = getNotes();
    const noteObj = {
        id: count,
        content: "",
    };
    count++;
    createNoteElement(noteObj.id, noteObj.content);
    localNotes.push(noteObj);
    saveNotes(localNotes)
}

// Updates existing note
function updateNote(id, newContent) {
    const localNotes = getNotes();
    const target = localNotes.filter(note => note.id == id)[0];
    target.content = newContent;
    saveNotes(localNotes);
}

// Deletes existing note
function deleteNote(id, element) {
    const localNotes = getNotes().filter(note => note.id != id);
    saveNotes(localNotes);
    board.removeChild(element);
}