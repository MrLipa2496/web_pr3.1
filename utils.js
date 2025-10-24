export const random = num => Math.ceil(Math.random() * num)

export const generateLog = (
  firstPerson,
  secondPerson,
  damage,
  hpLeft,
  hpTotal
) => {
  const { name: name1 } = firstPerson
  const { name: name2 } = secondPerson
  const logs = [
    `${name1} згадав щось важливе, але ${name2} від страху вдарив його у плече.`,
    `${name1} поперхнувся, і ${name2} злякавшись дав коліном у лоб.`,
    `${name1} задумався, а ${name2} з несподіванки різко вдарив.`,
    `${name1} прийшов до тями, але ${name2} випадково наніс потужний удар.`,
    `${name1} здивувався, а ${name2} похитнувшись вліпив підлий удар.`,
    `${name1} спробував щось сказати, але ${name2} знудьгувався і розбив брову супротивнику.`
  ]
  const text = logs[random(logs.length) - 1]
  return `${text}  -${damage} [${hpLeft}/${hpTotal}]`
}

export const renderLog = text => {
  const $logs = document.getElementById('logs')
  const p = document.createElement('p')
  p.innerText = text
  $logs.insertBefore(p, $logs.firstChild)
}
