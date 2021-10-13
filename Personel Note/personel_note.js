console.log('Personel note reminder project: ');

showNotes();
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {

    let noteText = document.getElementById('noteText');
    let noteTitle = document.getElementById('noteTitle');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    let myObj = {
        title: noteTitle.value,
        text: noteText.value
    }

    noteObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    noteText.value = '';
    noteTitle.value = '';
    showNotes();
});


// Displaying all stored notes
function showNotes() {
    let allNotes = localStorage.getItem('notes');
    if (allNotes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(allNotes);
    }

    let html = '';
    noteObj.forEach(function (element, index) {
        html += `
        <div class="card col-md-3 m-2 bg-light" style="width: 22rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <a id="${index}" class="btn btn-outline-danger" onclick="deleteNote(this.id)">Delete Note</a>
            </div>
        </div>
        `
    });

    let noteElem = document.getElementById('show_notes');
    if (noteObj.length != 0){
        noteElem.innerHTML = html;
    }
    else{
        noteElem.innerHTML = `<p class="fs-4 lead">Sorry! There is no note(s) is present to show you</p>`;
    }
}


// Deleting a single note
function deleteNote(index){
    let allNotes = localStorage.getItem('notes');
    if (allNotes == null){
        noteObj = [];
    }
    else{
        noteObj = JSON.parse(allNotes);
    }
    noteObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    showNotes();
}


// Searching notes from the stored notes
let search = document.getElementById('search_note');
search.addEventListener('input', function(e){
    let noteCard = document.getElementsByClassName('card');
    Array.from(noteCard).forEach(function(element){
        let cardText = element.getElementsByTagName('p')[0].innerText;
        if (cardText.toLowerCase().includes(search.value.toLowerCase())){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    });
});

/* 
Further feature
1- mark a node as important
2- separate notes by user

*/