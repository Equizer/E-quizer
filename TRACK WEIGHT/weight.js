//variables
let weightList = JSON.parse(localStorage.getItem('weightList'))
if (!weightList) {
  weightList = [];
}
const addButton = document.querySelector('.js-add-button');
const inputName = document.querySelector('.js-name');
const inputWeight = document.querySelector('.js-input-element');
const inputDate = document.querySelector('.js-input-date');
const inputTime = document.querySelector('.js-input-time');
const dropdown = document.querySelector('.js-dropdown');
const deleteButton = document.querySelectorAll('.js-delete-button');
//----------------------------------------------------------------------------------


//------------------------------ function Definitions ------------------------------

function addWeight() {
  const name = inputName.value;
  const weight = inputWeight.value;
  const date = inputDate.value;
  const time = inputTime.value;
  const opt = dropdown.value;

  weightList.push({
    name: name,
    weight: weight,
    date: date,
    time: time,
    opt: opt
  });
  
  //following code will clear the input after adding weight
  inputName.value = '';
  inputWeight.value = '';
  inputDate.value = '';
  inputTime.value = '';


  displayWeight();
  saveToStorage();
}

function displayWeight() {
  //it is crucial for  " let weightListHTML = ''; " to be here or else if it is declared universally it will display it double times
  let weightListHTML = '';

  weightList.forEach((value, index) => {
    weightListHTML += `
    <div class="weight-grid">
    <div class="value-name">${index + 1}. ${value.name}</div> 
      <div class="value-weight">${value.weight}${value.opt}</div>
      <div class="value-date">${value.date}</div>
      <div class="value-time">${value.time}</div>
      <button class="js-delete-button btn btn-danger">Delete</button>
    </div>
    <div class="display-alert"></div>
    `;
  })
  document.querySelector('.js-display-weight').innerHTML = weightListHTML;

  document.querySelectorAll('.js-delete-button').forEach((buttonToDelete, index) => {
    buttonToDelete.addEventListener('click', () => {
      document.querySelector('.display-alert').innerHTML = `
      <p class="para-question">Are you sure you want to delete this info?: <button class="js-yes btn btn-dark">Yes</button><button class="js-no btn btn-dark">No</button></p>
      `;
      document.querySelector('.js-yes').addEventListener('click', () => {
        weightList.splice(index, 1);
        saveToStorage();
        displayWeight();
      })
      document.querySelector('.js-no').addEventListener('click', () => {
        document.querySelector('.display-alert').innerHTML = '';
      })

    })
  })
  console.log(document.querySelectorAll('.js-delete-button'));
}


function saveToStorage() {
  localStorage.setItem('weightList', JSON.stringify(weightList));
}

//----------------------------------------------------------------------------------


//Calling Functions

//we'll call the function at start to display it
displayWeight();
addButton.addEventListener('click', () => {
  addWeight();
})
inputWeight.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addWeight();
  }
})
inputDate.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addWeight();
  }
})
//----------------------------------------------------------------------------------

