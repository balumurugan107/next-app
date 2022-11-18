export default <T extends Record<string, any>>(json: T) =>
  Object.entries(json)
    ?.map<string>(([key, value]: [string, string | string[]]) =>
      Array.isArray(value)
        ? `${key}=${`[${value?.map<string>((mapDatum: string) => `"${mapDatum}"`)}]`}`
        : new URLSearchParams({ [key]: value }).toString()
    )
    .join('&');
