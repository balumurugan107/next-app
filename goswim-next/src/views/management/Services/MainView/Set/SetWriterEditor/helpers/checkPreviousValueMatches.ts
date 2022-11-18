const generatePossibleValues = (data: string) =>
  new Array(data.length).fill(null).map((_1, index) => data.slice((index + 1) * -1).toLowerCase());

/** Function to check if a previous value is present in the selected text */
export default (text: string, selectedText: string, previousValue: string) => {
  const index = text.indexOf(selectedText);
  const slicedText = text.slice(0, index);
  if (slicedText.slice(-1) === ' ') return false;
  if (
    generatePossibleValues(slicedText.split(' ').slice(-1)[0]).includes(previousValue.toLowerCase())
  )
    return true;
  return false;
};
