const btn = document.querySelector('#btn');
const from = document.querySelector('#from');
const to = document.querySelector('#to');

const removeQuotes = (string) => string.replaceAll('\'', '')

btn.addEventListener('click', () => {
  let useStyles = from.value;
  let SCSS = '';
  let insideQuotes = false;
  let classesPositions = [];
  for (let i = 0; i < useStyles.length; i++) {
    const char = useStyles.charAt(i);
    if (char === '\'' || char === '\"') insideQuotes = !insideQuotes;
    // camelCase to kebab-case
    if (char.match(/[a-z]/i) && char === char.toUpperCase() && useStyles.charAt(i - 1).match(/[a-z]/i) &&
      useStyles.charAt(i - 1) === useStyles.charAt(i - 1).toLowerCase()) SCSS += `-${char.toLowerCase()}`; else {
        // ',' to ';'
        if (char === ',' && useStyles.charAt(i+2) === ' ' && !insideQuotes) SCSS += ';'; else
          SCSS += (char === ':' && useStyles.charAt(i+2) === '{'  ? '' : char);
      }
    // add px after numbers
    // if (/^\d+$/.test(char) && (nextChar === ',' || nextChar === ' ')) {
    //   SCSS += 'px'
    // }
  }
  useStyles = SCSS;
  for (let i = 0; i < useStyles.length; i++) {
    const char = useStyles.charAt(i);
    if (char === '{') {
      let index = 3;
      while (useStyles.charAt(i - index) === '-' || useStyles.charAt(i - index).match(/[a-z]/i) ) {
        index++;
      }
      if (useStyles.charAt(i - index) !== ':')
        classesPositions.push(i-index+1)
    }
  }
  classesPositions.forEach((el, index) => {
      SCSS = SCSS.slice(0, classesPositions[classesPositions.length - index - 1]) + '.' + SCSS.slice(classesPositions[classesPositions.length - index - 1])
  })
  SCSS = removeQuotes(SCSS);
  to.innerHTML = SCSS;
})
