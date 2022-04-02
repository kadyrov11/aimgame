const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
const timeEl = document.getElementById('time')
const board = document.getElementById('board')
const playAgainBtn = document.getElementById('play-again')

let time = 20
let score = 0
let intervalId = null

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
    // e.target.closest('.screen').classList.add('up')
})

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = +e.target.getAttribute('data-time')
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

playAgainBtn.addEventListener('click',(e) => {
    e.preventDefault()
    score = 0
    timeEl.parentNode.className = ''
    clearInterval(intervalId)
    board.innerHTML = ''
    screens.forEach(screen => screen.className = 'screen')
    screens[0].classList.add('up')
    
})

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function startGame() {
    intervalId = setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomCircle()
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')

    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(100, width - size)
    const y = getRandomNumber(100,height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min,max) {
    return Math.round(Math.random() * (min - max) + max)
}