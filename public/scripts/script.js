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

const grass = document.querySelector('.rainbarrel_visual_ground')

// When the empty button is clicked, show the popup
if (emptyButton) {
    emptyButton.addEventListener('click', (e) => {
        console.log('Empty button clicked');
        e.preventDefault();
        popup.classList.remove('none');
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
if (rondAfButton) {
  rondAfButton.addEventListener('click', function(event) {
  const isFormValid = validateForm(); // Functie om het formulier te valideren

  if (!isFormValid) {
    event.preventDefault();
    return; // Stop de functie als het formulier ongeldig is
  }
});
}


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

if (confirmEmptyButton) {
    confirmEmptyButton.addEventListener('click', () => {
        const water = document.querySelector('.water')
        const tap = document.querySelector('.tap-tap')
        const stream = document.querySelector('.water-stream')
        tap.classList.add('open-tap')
        popup.classList.add('none');
        stream.classList.add('go-stream');
        grass.classList.add('changeGrass')
        water.classList.add('empty')
        setTimeout(function(){
            stream.classList.add('no-stream');
            tap.classList.remove('open-tap')
            setTimeout(function(){
                fetch('/empty', {
                    method: 'POST'
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    window.location.reload();
                });
             },1500);        
        }, 1500)
    });
}

if (cancelButton) {
    cancelButton.addEventListener('click', () => {
        console.log('Cancel button clicked');
        popup.classList.add('none');
    });
}


const fieldset1 = document.getElementById('fieldset1');
const fieldset2 = document.getElementById('fieldset2');
const fieldset3 = document.getElementById('fieldset3');
const fieldset4 = document.getElementById('fieldset4');
const fieldset5 = document.getElementById('fieldset5');

const fieldset1VolgendeKnop = document.getElementById('fieldset1-volgende-knop');
const fieldset2TerugKnop = document.getElementById('fieldset2-terug-knop');
const fieldset2VolgendeKnop = document.getElementById('fieldset2-volgende-knop');
const fieldset3TerugKnop = document.getElementById('fieldset3-terug-knop');
const fieldset3VolgendeKnop = document.getElementById('fieldset3-volgende-knop');
const fieldset4TerugKnop = document.getElementById('fieldset4-terug-knop');
const fieldset4VolgendeKnop = document.getElementById('fieldset4-volgende-knop');
const fieldset5TerugKnop = document.getElementById('fieldset5-terug-knop');
const fieldset5VolgendeKnop = document.getElementById('fieldset5-volgende-knop');

const fieldsetStap1 = document.getElementById('fieldset-stap1');
const fieldsetStap2 = document.getElementById('fieldset-stap2');
const fieldsetStap3 = document.getElementById('fieldset-stap3');
const fieldsetStap4 = document.getElementById('fieldset-stap4');
const fieldsetStap5 = document.getElementById('fieldset-stap5');

if (fieldset1VolgendeKnop) {
    fieldset1VolgendeKnop.addEventListener('click', function(event) {
        event.preventDefault();
    
        fieldset1.style.display = "none";
        fieldset2.style.display = "block";
    
        fieldsetStap1.style.width = "0.6em";
        fieldsetStap1.style.height = "0.6em";
        fieldsetStap1.style.backgroundColor = "#EDEDED";
        fieldsetStap2.style.width = "1.2em";
        fieldsetStap2.style.height = "1.2em";
        fieldsetStap2.style.backgroundColor = "#36A734";
    });
}

if (fieldset2TerugKnop) {
    fieldset2TerugKnop.addEventListener('click', function(event) {
        event.preventDefault();
    
        fieldset1.style.display = "block";
        fieldset2.style.display = "none";
    
        fieldsetStap2.style.width = "0.6em";
        fieldsetStap2.style.height = "0.6em";
        fieldsetStap2.style.backgroundColor = "#EDEDED";
        fieldsetStap1.style.width = "1.2em";
        fieldsetStap1.style.height = "1.2em";
        fieldsetStap1.style.backgroundColor = "#36A734";
    });
}

if (fieldset2VolgendeKnop) {
    fieldset2VolgendeKnop.addEventListener('click', function(event) {
        event.preventDefault();
    
        fieldset2.style.display = "none";
        fieldset3.style.display = "block";
    
        fieldsetStap2.style.width = "0.6em";
        fieldsetStap2.style.height = "0.6em";
        fieldsetStap2.style.backgroundColor = "#EDEDED";
        fieldsetStap3.style.width = "1.2em";
        fieldsetStap3.style.height = "1.2em";
        fieldsetStap3.style.backgroundColor = "#36A734";
    });
}

if (fieldset3TerugKnop) {
    fieldset3TerugKnop.addEventListener('click', function(event) {
        event.preventDefault();
    
        fieldset2.style.display = "block";
        fieldset3.style.display = "none";
    
        fieldsetStap3.style.width = "0.6em";
        fieldsetStap3.style.height = "0.6em";
        fieldsetStap3.style.backgroundColor = "#EDEDED";
        fieldsetStap2.style.width = "1.2em";
        fieldsetStap2.style.height = "1.2em";
        fieldsetStap2.style.backgroundColor = "#36A734";
    });
}

if (fieldset3VolgendeKnop) {
    fieldset3VolgendeKnop.addEventListener('click', function(event) {
        event.preventDefault();
    
        fieldset3.style.display = "none";
        fieldset4.style.display = "block";
    
        fieldsetStap3.style.width = "0.6em";
        fieldsetStap3.style.height = "0.6em";
        fieldsetStap2.style.backgroundColor = "#EDEDED";
        fieldsetStap4.style.width = "1.2em";
        fieldsetStap4.style.height = "1.2em";
        fieldsetStap4.style.backgroundColor = "#36A734";
    });
}

if  (fieldset4TerugKnop) {
    fieldset4TerugKnop.addEventListener('click', function(event) {
        event.preventDefault();
    
        fieldset3.style.display = "block";
        fieldset4.style.display = "none";
    
        fieldsetStap4.style.width = "0.6em";
        fieldsetStap4.style.height = "0.6em";
        fieldsetStap4.style.backgroundColor = "#EDEDED";
        fieldsetStap3.style.width = "1.2em";
        fieldsetStap3.style.height = "1.2em";
        fieldsetStap3.style.backgroundColor = "#36A734";
    });
}

if (fieldset4VolgendeKnop) {
    fieldset4VolgendeKnop.addEventListener('click', function(event) {
        event.preventDefault();
    
        fieldset4.style.display = "none";
        fieldset5.style.display = "block";
    
        fieldsetStap4.style.width = "0.6em";
        fieldsetStap4.style.height = "0.6em";
        fieldsetStap4.style.backgroundColor = "#EDEDED";
        fieldsetStap5.style.width = "1.2em";
        fieldsetStap5.style.height = "1.2em";
        fieldsetStap5.style.backgroundColor = "#36A734";
    });
}

if (fieldset5TerugKnop) {
    fieldset5TerugKnop.addEventListener('click', function(event) {
        event.preventDefault();
    
        fieldset4.style.display = "block";
        fieldset5.style.display = "none";
    
        fieldsetStap5.style.width = "0.6em";
        fieldsetStap5.style.height = "0.6em";
        fieldsetStap5.style.backgroundColor = "#EDEDED";
        fieldsetStap4.style.width = "1.2em";
        fieldsetStap4.style.height = "1.2em";
        fieldsetStap4.style.backgroundColor = "#36A734";
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js').then(function(reg) {
        console.log('Successfully registered service worker', reg);
    }).catch(function(err) {
        console.warn('Error whilst registering service worker', err);
    });
    }

// INSTALLATION

let deferredPrompt;
const addBtn = document.querySelector(".add-button");
if (addBtn) {
    addBtn.style.display = "none";
}


window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    if (addBtn) {
        addBtn.style.display = "block";
    }
  
    if (addBtn) {
        addBtn.addEventListener("click", (e) => {
            // hide our user interface that shows our A2HS button
            addBtn.style.display = "none";
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
              } else {
                console.log("User dismissed the A2HS prompt");
              }
              deferredPrompt = null;
            });
          });
    }
  });


  window.onload = function() {
    var svg = document.querySelector('.notification_svg');
    var modal = document.getElementById('notification_modal');
    
    if ( svg === null){
        return
    }
    
    svg.addEventListener('click', function() {
        console.log('svg is clicked');
        modal.classList.add('visible');
    });

    modal.addEventListener('click', function() {
        modal.classList.remove('visible');
    });

}