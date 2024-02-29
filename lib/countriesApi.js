export async function fetchCountries () {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  return data
}
