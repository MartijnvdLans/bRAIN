const hamburgerBtn = document.querySelector('#hamburger')
const crossBtn = document.querySelector('#cross')
const nav = document.querySelector('nav')
const emptyBtn = document.querySelector('#empty')

const rainAmount = document.getElementById('rain-amount')

const popupVol = document.querySelector('#popup-1')
const popupVolBtn = document.querySelector('#popup-1 button')

const popupLeeg = document.querySelector('#popup-3')
const popupLeegBtn = document.querySelector('#popup-3 button')

const popupZeker = document.querySelector('#popup-2')
const popupZekerBtn = document.querySelector('#popup-2 button:nth-child(2)')
const popupZekerBtnWait = document.querySelector('#popup-2 button:nth-child(1)')

let empty = false

hamburgerBtn.addEventListener('click', () => {
    nav.classList.remove('hidden')
})

crossBtn.addEventListener('click', () => {
    nav.classList.add('hidden')
})

popupVolBtn.addEventListener('click', () => {
    popupVol.classList.add('none')
})

emptyBtn.addEventListener('click', () => {
    if (empty == true) {
        popupLeeg.classList.remove('none')
    } else if (empty == false) {
        popupZeker.classList.remove('none')
    }
})

popupLeegBtn.addEventListener('click', () => {
    popupLeeg.classList.add('none')
})

popupZekerBtn.addEventListener('click', () => {
    rainAmount.style.height = "0px"
    popupZeker.classList.add('none')
    empty = true

})

popupZekerBtnWait.addEventListener('click', () => {
    popupZeker.classList.add('none')
})