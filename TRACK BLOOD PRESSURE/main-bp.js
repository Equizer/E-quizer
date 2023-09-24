//--------------------------- Variables -------------------------------------
let userName = JSON.parse(localStorage.getItem('userName')) || null;
let userAge = JSON.parse(localStorage.getItem('userAge')) || 'N/A';
// --------------------------------------------------------------------------


//--------------------------- Query Selectors -------------------------------
const inputName = document.querySelector('.js-input-name');
const inputAge = document.querySelector('.js-input-age');
const hiddenClass = document.querySelector('.js-hidden-class');
const parentHiddenClass = document.querySelector('.js-parent-div-info');
const greetDiv = document.querySelector('.js-greet-user-text');
const openUserInputButton = document.querySelector('.js-open-user-input-div-button');
const hiddenClassUserInputDiv = document.querySelector('.js-hidden-class-user-input');
const inputCrossButton = document.querySelector('.js-input-cross');
const inputCancelButton = document.querySelector('.js-input-cancel-button');
const inputAddButton = document.querySelector('.js-user-input-add-button');
const inputSys = document.querySelector('.js-input-blood-pressure');
const inputDia = document.querySelector('.js-input-dia');
const inputPulse = document.querySelector('.js-input-pulse');
const inputDate = document.querySelector('.js-input-date');
const inputTime = document.querySelector('.js-input-time');
const main = document.querySelector('.js-main');
const footer = document.querySelector('.js-footer');
const dataDiv = document.querySelector('.js-data-div');
const deleteAllButton = document.querySelector('.js-delete-all-button');


//we'll just make the varibale here but assign the value later as this is the only correct way becuz if we were to make it here abd assign the value here it wouldnt work and if we make tha variable in the event listener then we cannot use it outside that event listener.
let sys;
let dia;
let pulse;
let date;
let time;
//--------------------------------------------------------------------------

//checking if the user has saved his/her name if has then we will change the text in the greeDiv to name user has saved, this is here and not on top becuz it wouldve thrown an error that cannot access greetDiv before initialization 
if (userName) {
  changeGreetText();
}
else {
  addHiddenClasses();

  //following code will prevent scrolling in the bg 
  document.body.style.overflow = 'hidden';
};

//----------------------------  -------------------------------

//---------------------------------------------------------------------------








//---------------------------- Event Listeners ----------------------------


//we have to to use All and loop through as we have more than one classes name js-cancel-confirm-button
document.querySelectorAll('.js-cancel-confirm-button').forEach((btn) => {
  btn.addEventListener('click', () => {
    removeHiddenClasses();
    document.body.style.overflow = 'auto';
  });
});


document.querySelector('.js-confirm-button').addEventListener('click', () => {
  if (inputName.value === '') {
    return;
    //first learn and then add a throw error here.
  }
  else {
    userName = inputName.value;
    userAge = inputAge.value;
    saveToStorage();
  }
  changeGreetText();
});


document.querySelector('.js-reset-button').addEventListener('click', () => {
  // remove userName and userAge is stored in localStorage on clicking reset button
  localStorage.removeItem('userName');
  localStorage.removeItem('userAge');

  //after resetting change the greeting div back to  HELLO THERE!
  greetDiv.innerHTML = "Hello, There!";

  //following two lines of code will clear the input or else it will show the previously entered data
  inputName.value = '';
  inputAge.value = '';

  //making the enter info div reappearing on clicking reset button
  addHiddenClasses();
  //following code will prevent scrolling in the bg 
  document.body.style.overflow = 'hidden';
});

parentHiddenClass.addEventListener('click', (e) => {
  if (e.target === parentHiddenClass) {
    removeHiddenClasses();
    document.body.style.overflow = 'auto';
  }
})


openUserInputButton.addEventListener('click', () => {
  hiddenClassUserInputDiv.classList.remove('hidden-class-user-input');
});

inputCrossButton.addEventListener('click', () => {
  hiddenClassUserInputDiv.classList.add('hidden-class-user-input');
});

inputCancelButton.addEventListener('click', () => {
  hiddenClassUserInputDiv.classList.add('hidden-class-user-input');
});

inputAddButton.addEventListener('click', () => {
  addData();
  displayData();
  hiddenClassUserInputDiv.classList.add('hidden-class-user-input');
});


deleteAllButton.addEventListener('click', () => {
  localStorage.removeItem('data'); //this is compulsory as this will remove it from the local storage

  dataArray = [];  //this will delete the array whatever is in the array will be deleted this is not neccessary as we are removing from localStorage and then emptying the innerHTML of dataDiv and then generating rows again.

  dataDiv.innerHTML = ''; //this will just clear all the html in the div 
  generateRows(); //after clearing the html we will generate some rows with this function.
});




//------------------------------------------------------------------------




//---------------------------------- functions  -----------------------------


function saveToStorage() {
  localStorage.setItem('userName', JSON.stringify(userName))
  localStorage.setItem('userAge', JSON.stringify(userAge));
}

function changeGreetText() {
  greetDiv.innerHTML = `Hello, ${userName}!`;
}


function addHiddenClasses() {
  parentHiddenClass.classList.add('parent-div');
  hiddenClass.classList.add('enter-name-div');
}

function removeHiddenClasses() {
  parentHiddenClass.classList.remove('parent-div');
  hiddenClass.classList.remove('enter-name-div');
}

//this function will generate the html rows when the page loads. we will call this function so that it generates when page loads.
function generateRows() {
  for (let i = 0; i <= 4; i++) {
    dataDiv.innerHTML += `      
    <div class="table-data">
      <div class="sys-data">--</div>
      <div class="dia-data">--</div>
      <div class="pulse-data">--</div>
      <div class="date-data">--</div>
      <div class="time-data">--</div>
      <div class="delete-button-div">
      <button class="js-table-delete-button delete-button">
      <i class="fa-solid fa-trash delete-icon" style="color: #ffffff;"></i>
      </button>
      </div>
    </div>`;
  }
}
generateRows();


let dataArray = JSON.parse(localStorage.getItem('data')) || [];
displayData();

function displayData() {
  let dataHTML = '';

  dataArray.forEach((data, index) => {
    const sys = data.sys;
    const dia = data.dia;
    const pulse = data.pulse;
    const date = data.date;
    const time = data.time;

    const html = `
      <div class="table-data">
        <div class="sys-data">${sys} (mmHg)</div>
        <div class="dia-data">${dia} (mmHg)</div>
        <div class="pulse-data">${pulse} (bpm)</div>
        <div class="date-data">${date}</div>
        <div class="time-data">${time}</div>
        <div class="delete-button-div">
          <button class="js-table-delete-button delete-button">
          <i class="fa-solid fa-trash delete-icon" style="color: #ffffff;"></i>
          </button>
        </div>
      </div>`;

    dataHTML += html;
  });
  dataDiv.innerHTML = '';
  dataDiv.innerHTML = dataHTML;
  generateRows();


  //below part has to be done inside this function itself as we are generating html right here so to use the 
  const allTableDeleteButton = document.querySelectorAll('.js-table-delete-button');
  allTableDeleteButton.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      dataArray.splice(index, 1);
      localStorage.removeItem('data');
      displayData();
    });
  });
}


function addData() {
  const sys = inputSys.value;
  const dia = inputDia.value;
  const pulse = inputPulse.value;
  const date = inputDate.value;
  const time = inputTime.value;

  dataArray.push({
    sys: sys,
    dia: dia,
    pulse: pulse,
    date: date,
    time: time
  });
  localStorage.setItem('data', JSON.stringify(dataArray));
}









//------------------------------------------------------------------------











