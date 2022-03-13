interface IContent  {
    text: string
}

interface ICalcReadTime {
  body: IContent[]
}[]

export  const calcReadTime =(contents: ICalcReadTime[]) => {
  let totalWords = 0

  contents.map((content) => {
    content.body.map((content) => {
    totalWords += content.text?.match(/ /g).length + 1;
  })
})

  return Math.ceil(totalWords / 100);
}
