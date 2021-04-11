
export const Store = async (name, value) => {
  const values = await localStorage.setItem(name, value)
}
export const Get = async (name) => {
  const values = await localStorage.getItem(name)
  return values
}

export const Remove = async (name) => {
  const values = await localStorage.setItem(name, '')
}
