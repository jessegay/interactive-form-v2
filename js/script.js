// give "name" field command focus on load.
const name = document.getElementById("name");
name.focus();

//Hide "job_role_other"
const other = document.getElementById("other-title");
other.style.display = "none";

// disable color select until design selection is made
const color = document.getElementById("color");
color.disabled = true;

// Update the “Color” field to read “Please select a T-shirt theme”.
const design = document.getElementById("design");


design.addEventListener('change', (event) => {
    console.log("selection started in design select");
    color.disabled = false;
})



