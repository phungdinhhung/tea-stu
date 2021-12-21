export default function SplitSearch(search) {
  const arraySearch = search.substring(1).split('&')
  var queryJSON = {}
  arraySearch.forEach((element) => {
    queryJSON[element.split('=')[0]] = element.split('=')[1]
  })
  return queryJSON
}
