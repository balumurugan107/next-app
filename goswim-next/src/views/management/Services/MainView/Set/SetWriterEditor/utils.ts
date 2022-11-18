/**
 * @author Pavithran R
 * @since 25/08/2020
 * @description Find function implemented with native for loop for increased perfomance
 * @param array Array on which native find is to be run on
 * @param callback Callback which validates and returns boolean for the required condition
 */
export const nativeFind = <T>(array: T[], callback: (datum: T) => boolean) => {
  let finalValue: T | null = null;
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      finalValue = array[i];
      break;
    }
  }
  return finalValue;
};

/**
 * Function to convert ms to total number of seconds
 * @param msString minute:seconds
 */
export const msToSeconds = (msString: string) => {
  const convertedMs = +msString;
  if (!isNaN(convertedMs)) return convertedMs;
  const splitDatum = msString.split(':');
  const seconds = +splitDatum[0] * 60 + +splitDatum[1];
  return seconds;
};
