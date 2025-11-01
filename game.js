import Pokemon from './Pokemon.js'
import { pokemons } from './pokemons.js'
import { random, renderLog } from './utils.js'

export default class Game {
  constructor () {
    this.$control = document.querySelector('.control')
    this.player1 = null
    this.player2 = null
    this.player3 = null
  }

  getRandomPokemon () {
    return pokemons[Math.floor(Math.random() * pokemons.length)]
  }

  start () {
    const available = [...pokemons]

    const randomPlayerIndex = Math.floor(Math.random() * available.length)
    const randomPlayer = available.splice(randomPlayerIndex, 1)[0]

    const randomEnemy1Index = Math.floor(Math.random() * available.length)
    const randomEnemy1 = available.splice(randomEnemy1Index, 1)[0]

    const randomEnemy2Index = Math.floor(Math.random() * available.length)
    const randomEnemy2 = available.splice(randomEnemy2Index, 1)[0]

    this.player1 = new Pokemon({ name: randomPlayer.name, id: 'character' })
    this.player2 = new Pokemon({ name: randomEnemy1.name, id: 'enemy1' })
    this.player3 = new Pokemon({ name: randomEnemy2.name, id: 'enemy2' })

    document.querySelector('#name-character').innerText = this.player1.name
    document.querySelector('#img-player1').src = randomPlayer.img

    document.querySelector('#name-enemy1').innerText = this.player2.name
    document.querySelector('#img-player2').src = randomEnemy1.img

    document.querySelector('#name-enemy2').innerText = this.player3.name
    document.querySelector('#img-player3').src = randomEnemy2.img

    this.generateButtons(randomPlayer.attacks)
  }

  createClickCounter (button, maxClicks) {
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

  generateButtons (attacks) {
    this.$control.innerHTML = ''
    attacks.forEach(attack => {
      const $btn = document.createElement('button')
      $btn.classList.add('button')
      $btn.innerText = attack.name
      const counter = this.createClickCounter($btn, attack.maxCount)

      $btn.addEventListener('click', () => {
        if (!counter()) return
        const damage =
          Math.floor(
            Math.random() * (attack.maxDamage - attack.minDamage + 1)
          ) + attack.minDamage

        this.player2.changeHP(damage, this.player1, renderLog)
        this.player3.changeHP(damage, this.player1, renderLog)

        this.enemyAttack(this.player2, this.player1)
        this.enemyAttack(this.player3, this.player1)

        this.checkEndGame()
      })

      this.$control.appendChild($btn)
    })
  }

  enemyAttack (attacker, enemy) {
    const attack = pokemons.find(p => p.name === attacker.name)?.attacks?.[0]
    if (!attack) return

    const baseDamage =
      Math.floor(Math.random() * (attack.maxDamage - attack.minDamage + 1)) +
      attack.minDamage
    const damage = Math.floor(baseDamage * (0.5 + Math.random() * 0.2)) // 50–70%

    if (Math.random() < 0.15) {
      renderLog(`${attacker.name} промахнувся!`)
      return
    }

    enemy.changeHP(damage, attacker, renderLog)
  }

  checkEndGame () {
    if (this.player2.damageHP <= 0 && this.player3.damageHP <= 0) {
      renderLog('🎉 ВИ ПЕРЕМОГЛИ!')
      setTimeout(() => this.start(), 2000)
    }
    if (this.player1.damageHP <= 0) {
      renderLog('💀 Ви програли...')
      const $btn = document.createElement('button')
      $btn.classList.add('button')
      $btn.innerText = '🔁 START NEW GAME'
      $btn.onclick = () => {
        $btn.remove()
        this.start()
      }
      this.$control.appendChild($btn)
    }
  }
}
