export { throttle } from 'lodash-es'

export function formatNumber(number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}
