import { generateLog } from './utils.js'

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
    this.elProgressbar.classList.remove('low', 'critical')
    if (this.damageHP < 20) {
      this.elProgressbar.classList.add('critical')
    } else if (this.damageHP < 60) {
      this.elProgressbar.classList.add('low')
    }
  }

  renderHP () {
    this.renderHPLife()
    this.renderProgressbarHP()
  }

  changeHP (count, enemy, callback) {
    this.damageHP = Math.max(this.damageHP - count, 0)
    this.renderHP()
    const log = generateLog(enemy, this, count, this.damageHP, this.defaultHP)
    callback?.(log)

    if (this.damageHP === 0 && !this.lost) {
      alert(`Бідний ${this.name} програв бій!`)
      this.lost = true
    }
  }
}
