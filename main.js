const addbox = document.querySelector('.add-box');
const popupbox = document.querySelector('.popup-box');
const closeIcon = document.querySelector('header i');
const addBtn = document.querySelector('button');
const titleTag = popupbox.querySelector('input');
const descTag = popupbox.querySelector('textarea');

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// ✅ Fix: Ensure `notes` is always an array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// ✅ Prevent error if `notes` is not an array
if (!Array.isArray(notes)) {
   console.warn("Invalid notes data found. Resetting notes.");
   notes = []; 
   localStorage.setItem("notes", JSON.stringify(notes));
}


addbox.addEventListener("click", () => {
    popupbox.classList.add('show');
});

closeIcon.addEventListener("click", () => {
    popupbox.classList.remove('show');
});

function showNote() {
    // Clear existing notes
    const existingNotes = document.querySelectorAll(".note");
    existingNotes.forEach(note => note.remove());

    // Iterate over the notes and display each one
    notes.forEach(note => {
        let liTag = `
        <li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i class='bx bx-dots-horizontal-rounded'></i>
                    <ul class="menu">
                        <i class='bx bx-pencil'>Edit</i>
                        <i class='bx bx-trash'>Delete</i>
                    </ul>
                </div>
            </div>
        </li>`;
        addbox.insertAdjacentHTML("afterend", liTag);
    });
}

showNote();

addBtn.addEventListener("click", e => {
    e.preventDefault();

    let noteTitle = titleTag.value.trim();
    let noteDesc = descTag.value.trim();

    if (noteTitle || noteDesc) {
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        };

        // ✅ Push new note and save correctly
        notes.push(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));

        console.log("Note added:", noteInfo);

        // ✅ Clear input fields
        titleTag.value = "";
        descTag.value = "";

        closeIcon.click();
        showNote();
    }
});
