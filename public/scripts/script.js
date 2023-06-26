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
emptyButton.addEventListener('click', (e) => {
    console.log('Empty button clicked');
    e.preventDefault();
    popup.classList.remove('none');
});

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

cancelButton.addEventListener('click', () => {
    console.log('Cancel button clicked');
    popup.classList.add('none');
});