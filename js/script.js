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
        // loop through color and hide options whose text contains '♥' 
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

/*
For the T-Shirt "Color" menu, after a user selects a theme, only display the color options that match the design selected in the "Design" menu.
If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
 
Instructions say to do this inside the event listener. My attempt starts at line 27 
*/

// Up next
/*
Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- 
you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.

When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.

As a user selects activities, a running total should display below the list of checkboxes. 
For example, if the user selects "Main Conference", then Total: $200 should appear. 
If they add 1 workshop, the total should change to Total: $300.

data-day-and-time="Tuesday 9am-12pm"
data-day-and-time="Tuesday 1pm-4pm"

*/
//create array to store all checkboxes
const checkboxes = document.querySelectorAll('.activities input');
//console.log(checkboxes);
document.querySelector('.activities').addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedType = e.target.getAttribute('data-day-and-time');
    for (let i = 0; i < checkboxes.length; i ++) {
        let checkboxType = checkboxes[i].getAttribute('data-day-and-time');
        if (clickedType === checkboxType && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            }
        }

    }









})