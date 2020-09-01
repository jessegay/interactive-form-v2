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
    //Resets the color select to the placeholder (so when user changes theme, they are prompted to chose again)
    color.selectedIndex = '0';
    //If user selects Puns, ♥ options are hidden
    if (event.target.value == 'js puns') {
        // loop through color and hide options whose text contains '♥' (for some reason I can't use the decimal equivalent)
        var i;
         for (i = 0; i < color.length; i++) {
            if (color.options[i].text.includes('♥')) {
                color.options[i].hidden = true;
            }   else {
                color.options[i].hidden = false;
            }                  
        } 
    }  
    //If user selects ♥, Puns options are hidden
    if (event.target.value == 'heart js') {
        // loop through color and hide options whose text contains puns
        var i;
        for (i = 0; i < color.length; i++) {
            if (color.options[i].text.includes('Puns')) {
                color.options[i].hidden = true;
            }   else {
                color.options[i].hidden = false;
            }                  
        }
    } 
  
})






// Up next
/*
For the T-Shirt "Color" menu, after a user selects a theme, only display the color options that match the design selected in the "Design" menu.
If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
 
Instructions say to do this inside the event listener. My attempt starts at line 27 

When a new theme is selected from the "Design" menu, both the "Color" field and drop down menu is updated. Hmmmm, the 
options are limited correctly, but I need to find a way to reset the color field to colorOptions[0]
*/

