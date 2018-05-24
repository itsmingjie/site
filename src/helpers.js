import createEmojiRegex from 'emoji-regex'

export const dt: string = (d: string) => new Date(d).toLocaleDateString()

const year: number = new Date().getFullYear()
export const tinyDt: string = (d: string) =>
  dt(d)
    .replace(`/${year}`, '')
    .replace(`${year}-`, '')

// based on https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L146
export const timeSince: string = (previous: string, current: string) => {
  const msPerSecond: number = 1000
  const msPerMinute: number = 60 * 1000
  const msPerHour: number = msPerMinute * 60
  const msPerDay: number = msPerHour * 24
  const msPerYear: number = msPerDay * 365

  const elapsed: number =
    (current ? new Date(current) : new Date()) - new Date(previous)

  if (elapsed < msPerMinute) {
    return '< 1m'
  } else if (elapsed < msPerHour) {
    const now: number = Math.round(elapsed / msPerMinute)
    return `${now}m`
  } else if (elapsed < msPerDay) {
    const now: number = Math.round(elapsed / msPerHour)
    return `${now}h`
  } else if (elapsed < msPerYear) {
    const now: number = Math.round(elapsed / msPerDay)
    return `${now}d`
  } else {
    const now: number = Math.round(elapsed / msPerYear)
    return `${now}y`
  }
}

// via https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L58
const originalEmojiRegex: RegExp = createEmojiRegex()
const regex: RegExp = new RegExp(
  `^(${originalEmojiRegex.toString().replace(/\/g$/, '')}|\\s)+$`
)
export const onlyContainsEmoji: boolean = (text: string) => regex.test(text)
