export const getDateInState = (date: string, condition: string = '.') => {
  const [d, m, y] = date.split(condition)

  return new Date(+y, +m - 1, +d)
}