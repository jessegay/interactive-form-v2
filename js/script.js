// Create variable to store total cost. Does it need to be global?
let totalCost = 0;

// Variables to store form inputs
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const email = document.querySelector('#mail');
const activitiesInputs = document.querySelectorAll('.activities input');
const activitiesFieldset = document.querySelector('.activities');
//activitiesFieldset.style.borderColor = 'purple';
//console.log(activitiesFieldset);

// Validator helper functions. Might move these down later.
/* Helper function to validate name input */
const nameValidator = () => {
    const userName = nameInput.value;
    console.log(userName);

    if(userName.length > 0) {
        return true;
    }
    else {
        nameInput.style.borderColor = 'red';
        return false;
    }
}

/* Helper function to validate email input */
const emailValidator = () => {
    const emailValue = email.value;
    const indexOfAt = emailValue.indexOf('@');
    const indexOfDot = emailValue.lastIndexOf('.');
    // check to see if email value has an @ before .
    if (indexOfAt > 1 && indexOfDot > (indexOfAt +1)) {
        return true;
    }   else {
        email.style.borderColor = 'red';
        return false;
    }

}

/* Helper function to validate that at least 1 activity has been selected*/

const activitiesValidator = () => {
    for (let i = 0; i < activitiesInputs.length; i ++ ) {
        if (activitiesInputs[i].checked) {
            console.log('You have picked an activity');
            return true;
        }
    }
    //This will run only if the loop concludes without finding any checked activites.
    activitiesFieldset.style.backgroundColor = 'red';
    return false;
}



// Create div for cost
const costDiv = document.createElement('div');
const costLabel = document.createElement('label');
costLabel.textContent = 'Cost($)';
costLabel.style.backgroundColor = '#6F9DDC';
costLabel.style.borderTopLeftRadius = '4px';
costLabel.style.borderTopRightRadius = '4px';
costDiv.appendChild(costLabel);
costDiv.style.backgroundColor = 'white';
costDiv.style.display = 'inLine-block';
costDiv.style.borderRadius = '4px';
//costDiv.insertAdjacentHTML('afterbegin', '<label for="cost">Cost($):</label>');

const placeholderCost = document.createTextNode('0');
costDiv.appendChild(placeholderCost);
const activities = document.getElementsByClassName('activities');
const lastActivity = activities[activities.length - 1];
lastActivity.appendChild(costDiv);

// give "name" field command focus on load. Can I use nameInput that I declared earlier?
nameInput.focus();

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


/*
Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- 
you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.

When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
// Up next
As a user selects activities, a running total should display below the list of checkboxes. 
For example, if the user selects "Main Conference", then Total: $200 should appear. 
If they add 1 workshop, the total should change to Total: $300.

*/
//create array to store all checkboxes
const checkboxes = document.querySelectorAll('.activities input');
document.querySelector('.activities').addEventListener('change', (e) => {
    totalCost = 0;
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
        // Calculate totalCost
        if (checkboxes[i].checked) {
            const cost = parseInt(checkboxes[i].getAttribute('data-cost'));
            totalCost += cost;
            console.log(totalCost);
        }
        //insert totalCost in costDiv
        placeholderCost.textContent = totalCost;
    }
})


/*
pseudocode
Every time event listener is triggered on checkboxes, loop through.
If checkboxes[i].checked
add cost to total cost.

Reset totalCost to 0 before each loop.

Need to create field or div to display this running total.
*/
/*
As a user selects activities, a running total should display below the list
 of checkboxes. For example, if the user selects "Main Conference", then 
 Total: $200 should appear. If they add 1 workshop, the total should change 
 to Total: $300.
*/

/*
"Payment Info" section
Display payment sections based on the payment option chosen in the select 
menu. The "Credit Card" payment option should be selected by default. 
Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. 
Payment option in the select menu should match the payment option displayed on the page.
When a user selects the "PayPal" payment option, the PayPal information should display,
and the credit card and “Bitcoin” information should be hidden.
When a user selects the "Bitcoin" payment option, the Bitcoin information 
should display, and the credit card and “PayPal” information should be hidden.
NOTE: The user should not be able to select the "Select Payment Method" option 
from the payment select menu, because the user should not be able to submit 
the form without a chosen payment option. */



// Create const to store payment info select
const payment = document.getElementById('payment');
// Make "select method" unselectable
payment[0].disabled = true;
// Select Credit Card by default
payment[1].selected = true;
// store each payment div
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
// hide options other than credit-card
paypalDiv.hidden = true;
bitcoinDiv.hidden = true;
// Create array of all payment divs
const paymentDivs = [creditCardDiv, paypalDiv, bitcoinDiv];
// Add event listener to it. Loop through paymentDivs. 
// If paymentDivs[i].id == event.target.value, paymentDivs[i].hidden = false, else = true
payment.addEventListener('change', (e) => {
        var i;
        for (i = 0; i < paymentDivs.length; i++) {
            if (paymentDivs[i].id.includes(e.target.value)) {
                paymentDivs[i].hidden = false; 
                } else {
                    paymentDivs[i].hidden = true;
                }
            }
    })

/* Helper function for CC Validation If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
Credit Card field should only accept a number between 13 and 16 digits.
The Zip Code field should accept a 5-digit number.
The CVV should only accept a number that is exactly 3 digits long. */

const creditCardValidator = () => {
    console.log('You are paying with Credit Card');
    const cardNumber = document.querySelector('#cc-num');
    console.log(cardNumber.value.length);
    if (cardNumber.value.length <= 16 && cardNumber.value.length >= 13 && typeof parseInt(cardNumber.value) === 'number') {
        console.log('your CC number is legit');
        return true;
    } else {
        console.log('There is a problem with your credit card number');
        cardNumber.style.borderColor = 'red';
        return false;
    }
}

const zipValidator = () => {
    const zip = document.querySelector('#zip');
    if (zip.value.length === 5 && typeof parseInt(zip.value) === 'number') {
        return true;
    } else {
        console.log('There is a problem with your zipcode');
        zip.style.borderColor = 'red';
        return false;
    }
}

const cvvValidator = () => {
    const cvv = document.querySelector('#cvv');   
    if (cvv.value.length === 3 && typeof parseInt(cvv.value) === 'number') {
        return true;
    } else {
        console.log('There is a problem with your CVV');
        cvv.style.borderColor = 'red';
        return false;
    }
}

/* Submit listener on the form element */
form.addEventListener('submit', (e) => {
    nameValidator();
    emailValidator();
    activitiesValidator();
    if (payment.value == 'credit-card') {
        creditCardValidator();
        zipValidator();
        cvvValidator();
    }
    // if/else results of validator methods
    if (!nameValidator()) {
        e.preventDefault();
        console.log('There is a problem with the name input which prevented submission');
    }
    else if (!emailValidator()) {
        e.preventDefault();
        console.log('There is problem with the email input which prevented submission');
    }
    else if (!activitiesValidator()) {
        e.preventDefault();
        console.log('You must select at least one Activity');
    }
    else {
        console.log('inputs look good');
    }

}    );