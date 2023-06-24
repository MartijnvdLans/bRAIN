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
emptyButton.addEventListener('click', (e) => {
    console.log('Empty button clicked');
    e.preventDefault();
    popup.classList.remove('none');
});

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

cancelButton.addEventListener('click', () => {
    console.log('Cancel button clicked');
    popup.classList.add('none');
});



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



