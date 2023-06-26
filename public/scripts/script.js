const rainTon = document.querySelector('#rainton')

if (rainTon) {
    // const emptyBtn = document.querySelector('#empty')

    const rainAmount2 = document.getElementById('rain-amount')

    const popupVol = document.querySelector('#popup-1')
    const popupVolBtn = document.querySelector('#popup-1 button')

    const popupLeeg = document.querySelector('#popup-3')
    const popupLeegBtn = document.querySelector('#popup-3 button')

    const popupZeker = document.querySelector('#popup-2')
    const popupZekerBtn = document.querySelector('#popup-2 button:nth-child(2)')
    const popupZekerBtnWait = document.querySelector('#popup-2 button:nth-child(1)')

    let empty = false

    popupVolBtn.addEventListener('click', () => {
        popupVol.classList.add('none')
    })

  

    popupLeegBtn.addEventListener('click', () => {
        popupLeeg.classList.add('none')
    })

    popupZekerBtn.addEventListener('click', () => {
        rainAmount2.style.height = "0px"
        popupZeker.classList.add('none')
        empty = true

    })

    popupZekerBtnWait.addEventListener('click', () => {
        popupZeker.classList.add('none')
    })
}

const emptyButton = document.querySelector('#empty button');
const confirmEmptyButton = document.querySelector('#popup-2 .around button:last-child');
const cancelButton = document.querySelector('#popup-2 .around button:first-child');
const popup = document.querySelector('#popup-2');

// When the empty button is clicked, show the popup
if (emptyButton) {
    emptyButton.addEventListener('click', (e) => {
        console.log('Empty button clicked');
        e.preventDefault();
        popup.classList.remove('none');
    });
    }

    if (confirmEmptyButton) {
        confirmEmptyButton.addEventListener('click', () => {
            fetch('/empty', {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                console.log('Cancel button clicked');
                popup.classList.add('none');
            });
            }





const fieldsets = document.querySelectorAll('fieldset');
const stappen = document.querySelectorAll('.stap');
let currentFieldsetIndex = 0;

function updateProgress() {
    stappen.forEach((stap, index) => {
      if (index === currentFieldsetIndex) {
        stap.classList.add('current');
      } else {
        stap.classList.remove('current');
      }
    });
  }    

function showFieldset(index) {
    fieldsets.forEach((fieldset, i) => {
        if (i === index) {
        fieldset.style.display = 'grid';
        currentFieldsetIndex = index; // Update de huidige fieldset-index
        } else {
        fieldset.style.display = 'none';
        }
    });

    updateProgress(); // Roep de updateProgress() functie aan
}

function nextFieldset() {
    if (currentFieldsetIndex < fieldsets.length - 1) {
      const isFormValid = validateForm(); // Valideer het formulier voordat je doorgaat
  
      if (isFormValid) {
        currentFieldsetIndex++;
        showFieldset(currentFieldsetIndex);
        updateProgress();
      } 
    }
  }  

function previousFieldset() {
    if (currentFieldsetIndex > 0) {
        currentFieldsetIndex--;
        showFieldset(currentFieldsetIndex);
        updateProgress();
    }
}

const volgendeButtons = document.querySelectorAll('.volgende-button');
    volgendeButtons.forEach((button) => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        nextFieldset();
    });
});

const terugButtons = document.querySelectorAll('.terug-button');
    terugButtons.forEach((button) => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        previousFieldset();
    });
});

const rondAfButton = document.getElementById('rondaf-button');
rondAfButton.addEventListener('click', function(event) {
  const isFormValid = validateForm(); // Functie om het formulier te valideren

  if (!isFormValid) {
    event.preventDefault();
    return; // Stop de functie als het formulier ongeldig is
  }
});


function validateForm() {
    const currentFieldset = fieldsets[currentFieldsetIndex];
    const inputs = currentFieldset.querySelectorAll('input');
    const errorMessages = currentFieldset.querySelectorAll('.error-message');
    let isValid = true;
    
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        errorMessages[i].textContent = 'Dit veld moet worden ingevuld';
        isValid = false;
      } else {
        errorMessages[i].textContent = ''; // Leeg het foutbericht als het veld is ingevuld
      }
    }
    
    return isValid;
  }
  
  
      



