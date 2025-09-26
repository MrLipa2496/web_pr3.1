const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character')
}

const enemy1 = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy1'),
  elProgressbar: document.getElementById('progressbar-enemy1')
}

const enemy2 = {
  name: 'Bulbasaur',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy2'),
  elProgressbar: document.getElementById('progressbar-enemy2')
}

function renderHPLife (person) {
  person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP
}

function renderProgressbarHP (person) {
  person.elProgressbar.style.width = person.damageHP + '%'
  if (person.damageHP > 60) {
    person.elProgressbar.style.background = '#4CAF50'
  } else if (person.damageHP > 30) {
    person.elProgressbar.style.background = '#FF9800'
  } else {
    person.elProgressbar.style.background = '#F44336'
  }
}

function renderHP (person) {
  renderHPLife(person)
  renderProgressbarHP(person)
}

function changeHP (count, person) {
  if (person.damageHP <= count) {
    person.damageHP = 0
    renderHP(person)
    if (!person.lost) {
      alert('Бідний ' + person.name + ' програв бій!')
      person.lost = true
    }
  } else {
    person.damageHP -= count
    renderHP(person)
  }
}

function random (num) {
  return Math.ceil(Math.random() * num)
}

function attack (person, maxDamage) {
  changeHP(random(maxDamage), person)
}

$btnKick.addEventListener('click', function () {
  console.log('Thunder Jolt!')
  attack(enemy1, 20)
  attack(enemy2, 20)
})

$btnQuick.addEventListener('click', function () {
  console.log('Quick Attack!')
  attack(enemy1, 10)
  attack(enemy2, 10)
})

function init () {
  console.log('Start Game!')
  renderHP(character)
  renderHP(enemy1)
  renderHP(enemy2)
}

init()
