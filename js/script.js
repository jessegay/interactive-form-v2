// give "name" field command focus on load.
const name = document.getElementById("name");
name.focus();

//Hide "job_role_other"
const other = document.getElementById("other-title");
other.style.display = "none";

// disable color select until Design selection is made
const color = document.getElementById("color");
color.disabled = true;

// Update the “Color” field to read “Please select a T-shirt theme”.
// Create new option
const colorPlaceholder = document.createElement('option');
colorPlaceholder.text = 'Please select a T-shirt theme';
// make it unselectable
colorPlaceholder.disabled = true;
// add it to color select at beginning of list
color.add(colorPlaceholder, color.options[0]);
color.selectedIndex = '0';

// Enable color selection once Design is selected
const design = document.getElementById("design");
design.addEventListener('change', (event) => {
    color.disabled = false;
})



