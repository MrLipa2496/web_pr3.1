import Pokemon from './Pokemon.js'
import { random, renderLog } from './utils.js'

const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')

const createClickCounter = (button, maxClicks) => {
  let clicks = 0
  const originalText = button.innerText
  return () => {
    if (clicks < maxClicks) {
      clicks++
      button.innerText = `${originalText} (${maxClicks - clicks} залишилось)`
      if (clicks === maxClicks) {
        button.disabled = true
        button.style.opacity = '0.6'
        button.innerText = `${originalText} (0 залишилось)`
      }
      return true
    }
    return false
  }
}

const kickCounter = createClickCounter($btnKick, 7)
const quickCounter = createClickCounter($btnQuick, 7)

const player1 = new Pokemon({ name: 'Pikachu', id: 'character' })
const player2 = new Pokemon({ name: 'Charmander', id: 'enemy1' })
const player3 = new Pokemon({ name: 'Bulbasaur', id: 'enemy2' })

const attack = (attacker, defender, maxDamage) => {
  const damage = random(maxDamage)
  defender.changeHP(damage, attacker, renderLog)
}

$btnKick.addEventListener('click', () => {
  if (kickCounter()) {
    attack(player1, player2, 20)
    attack(player1, player3, 20)
  }
})

$btnQuick.addEventListener('click', () => {
  if (quickCounter()) {
    attack(player1, player2, 10)
    attack(player1, player3, 10)
  }
})

console.log('Start Game!')
