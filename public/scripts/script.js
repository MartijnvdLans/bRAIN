const rainTon = document.querySelector('#rainton')

const hamburgerBtn = document.querySelector('#hamburger')
const crossBtn = document.querySelector('#cross')
const nav = document.querySelector('nav')

hamburgerBtn.addEventListener('click', () => {
    nav.classList.remove('hidden')
})

crossBtn.addEventListener('click', () => {
    nav.classList.add('hidden')
})

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

    // emptyBtn.addEventListener('click', () => {
    //     if (empty == true) {
    //         popupLeeg.classList.remove('none')
    //     } else if (empty == false) {
    //         popupZeker.classList.remove('none')
    //     }
    // })

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
        // Here you could update the rain amount in your HTML:
        // document.querySelector('#rain-amount').textContent = '0';
        // Or reload the page if you prefer:
        window.location.reload();
    });
});

cancelButton.addEventListener('click', () => {
    console.log('Cancel button clicked');
    popup.classList.add('none');
});