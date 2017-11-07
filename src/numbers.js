//Function used to format big numbers
export function format(number) {
  switch (true) {
    case (number >= Math.pow(10, 33)):
      return Math.floor(number / Math.pow(10, 30)) / 1000 + ' Dec'
    case (number >= Math.pow(10, 30)):
      return Math.floor(number / Math.pow(10, 27)) / 1000 + ' Non'
    case (number >= Math.pow(10, 27)):
      return Math.floor(number / Math.pow(10, 24)) / 1000 + ' Oct'
    case (number >= Math.pow(10, 24)):
      return Math.floor(number / Math.pow(10, 21)) / 1000 + ' Sept'
    case (number >= Math.pow(10, 21)):
      return Math.floor(number / Math.pow(10, 18)) / 1000 + ' Sext'
    case (number >= Math.pow(10, 18)):
      return Math.floor(number / Math.pow(10, 15)) / 1000 + ' Quin'
    case (number >= Math.pow(10, 15)):
      return Math.floor(number / Math.pow(10, 12)) / 1000 + ' Quad'
    case (number >= Math.pow(10, 12)):
      return Math.floor(number / Math.pow(10, 9)) / 1000 + ' T'
    case (number >= Math.pow(10, 9)):
      return Math.floor(number / Math.pow(10, 6)) / 1000 + ' B'
    case (number >= Math.pow(10, 6)):
      return Math.floor(number / Math.pow(10, 3)) / 1000 + ' M'
    case (number >= Math.pow(10, 3)):
      return Math.floor(number) / 1000 + ' K'
    default:
      return Math.round(number * 10) / 10
  }
}