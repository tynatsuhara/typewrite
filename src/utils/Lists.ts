export const Lists = Object.freeze({
  oneOf<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)]
  },

  /**
   * @param start inclusive
   * @param end exclusive
   */
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (v, k) => k + start)
  },
})
