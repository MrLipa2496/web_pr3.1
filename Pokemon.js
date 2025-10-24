import { random, generateLog, renderLog } from './utils.js'

export default class Pokemon {
  constructor ({ name, id }) {
    this.name = name
    this.defaultHP = 100
    this.damageHP = 100
    this.lost = false
    this.elHP = document.getElementById(`health-${id}`)
    this.elProgressbar = document.getElementById(`progressbar-${id}`)

    this.renderHP()
  }

  renderHPLife () {
    this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`
  }

  renderProgressbarHP () {
    this.elProgressbar.style.width = `${this.damageHP}%`
    this.elProgressbar.style.background =
      this.damageHP > 60
        ? '#4CAF50'
        : this.damageHP > 30
        ? '#FF9800'
        : '#F44336'
  }

  renderHP () {
    this.renderHPLife()
    this.renderProgressbarHP()
  }

  changeHP (count, enemy, callback) {
    if (this.damageHP <= count) {
      this.damageHP = 0
      this.renderHP()
      if (!this.lost) {
        alert(`Бідний ${this.name} програв бій!`)
        this.lost = true
      }
    } else {
      this.damageHP -= count
      this.renderHP()
      const log = generateLog(enemy, this, count, this.damageHP, this.defaultHP)
      callback?.(log)
    }
  }
}
