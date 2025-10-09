const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')
const $logs = document.getElementById('logs')

function random (num) {
  return Math.ceil(Math.random() * num)
}

function generateLog (firstPerson, secondPerson, damage, hpLeft, hpTotal) {
  const { name: name1 } = firstPerson
  const { name: name2 } = secondPerson

  const logs = [
    `${name1} вспомнил что-то важное, но неожиданно ${name2}, не помня себя от испуга, ударил в предплечье врага.`,
    `${name1} поперхнулся, и за это ${name2} с испугу приложил прямой удар коленом в лоб врага.`,
    `${name1} забылся, но в это время наглый ${name2}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${name1} пришел в себя, но неожиданно ${name2} случайно нанес мощнейший удар.`,
    `${name1} поперхнулся, но в это время ${name2} нехотя раздробил кулаком <вырезанно цензурой> противника.`,
    `${name1} удивился, а ${name2} пошатнувшись влепил подлый удар.`,
    `${name1} высморкался, но неожиданно ${name2} провел дробящий удар.`,
    `${name1} пошатнулся, и внезапно наглый ${name2} беспричинно ударил в ногу противника.`,
    `${name1} расстроился, как вдруг, неожиданно ${name2} случайно влепил стопой в живот соперника.`,
    `${name1} пытался что-то сказать, но вдруг, неожиданно ${name2} со скуки разбил бровь сопернику.`
  ]

  const text = logs[random(logs.length) - 1]
  return `${text}  -${damage} [${hpLeft}/${hpTotal}]`
}

function renderLog (text) {
  const p = document.createElement('p')
  p.innerText = text
  $logs.insertBefore(p, $logs.firstChild)
}

function createPlayer ({ name, id }) {
  const elHP = document.getElementById(`health-${id}`)
  const elProgressbar = document.getElementById(`progressbar-${id}`)

  const player = {
    name,
    defaultHP: 100,
    damageHP: 100,
    lost: false,
    elHP,
    elProgressbar,

    renderHPLife () {
      const { damageHP, defaultHP, elHP } = this
      elHP.innerText = `${damageHP} / ${defaultHP}`
    },

    renderProgressbarHP () {
      const { damageHP, elProgressbar } = this
      elProgressbar.style.width = `${damageHP}%`
      elProgressbar.style.background =
        damageHP > 60 ? '#4CAF50' : damageHP > 30 ? '#FF9800' : '#F44336'
    },

    renderHP () {
      this.renderHPLife()
      this.renderProgressbarHP()
    },

    changeHP (count, enemy) {
      const { name, defaultHP } = this

      if (this.damageHP <= count) {
        this.damageHP = 0
        this.renderHP()
        if (!this.lost) {
          alert(`Бідний ${name} програв бій!`)
          this.llost = true
        }
      } else {
        this.damageHP -= count
        this.renderHP()

        const log = generateLog(enemy, this, count, this.damageHP, defaultHP)
        renderLog(log)
      }
    }
  }

  return player
}

const character = createPlayer({ name: 'Pikachu', id: 'character' })
const enemy1 = createPlayer({ name: 'Charmander', id: 'enemy1' })
const enemy2 = createPlayer({ name: 'Bulbasaur', id: 'enemy2' })

function attack (attacker, defender, maxDamage) {
  const damage = random(maxDamage)
  defender.changeHP(damage, attacker)
}

$btnKick.addEventListener('click', () => {
  attack(character, enemy1, 20)
  attack(character, enemy2, 20)
})

$btnQuick.addEventListener('click', () => {
  attack(character, enemy1, 10)
  attack(character, enemy2, 10)
})

function init () {
  console.log('Start Game!')
  character.renderHP()
  enemy1.renderHP()
  enemy2.renderHP()
}

init()
