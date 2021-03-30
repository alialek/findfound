export default ({ $http, $req }, inject) => {
  const helpers = {
    formatDate: (date) => {
      const preFormattedDate = date
        .toLocaleString('ru', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('.')
      return `${preFormattedDate[2]}-${preFormattedDate[1]}-${preFormattedDate[0]}`
    },
    deepCopy: (data) => JSON.parse(JSON.stringify(data)), // Прости господи
    debounce: (func, ms) => {
      let timeoutID = null
      return function () {
        clearTimeout(timeoutID)
        const args = arguments
        const that = this
        timeoutID = setTimeout(function () {
          func.apply(that, args)
        }, ms)
      }
    },
  }

  inject('helpers', helpers)
}
