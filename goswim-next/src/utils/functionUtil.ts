export const changeToStrong = (string: any) => {
  let value = string.replaceAll(`<p>`, '').replaceAll(`</p>`, '');

  //value  = changeString(value, '***', '<strong><i>', '</i></strong>')
  // value  = changeString(value, '**', '<strong>', '</strong>')
  // value  = changeString(value, '*', '<i>', '</i>')
  // value  = changeStringSingleTag(value, '\\r\\n\\r\\n', '<br>')
  value = changeStringSingleTag(value, '\\r\\n', '\n\n');
  return value;
};

export const markDownForListContent = (string: any) => {
  let value = string.replaceAll(`<p>`, '').replaceAll(`</p>`, '');
  value = commonMarkLinkToAnchorTag(string);
  value = changeString(value, '***', '', '');
  value = changeString(value, '**', '', '');
  value = changeString(value, '*', '', '');
  value = changeString(value, '#', '', '');

  value = changeStringSingleTag(value, '\\r\\n\\r\\n', '');
  value = changeStringSingleTag(value, '\\r\\n', '');
  value = changeStringSingleTag(value, '\\', '');
  //value = markdownToHtml(value);
  return value;
};

function commonMarkLinkToAnchorTag(removeLink: string) {
  const rxCommonMarkLink = /(\[([^\]]+)])\(([^)]+)\)/g;
  const anchor = removeLink ? removeLink.replace(rxCommonMarkLink, '$2') : removeLink;

  return anchor;
}

const changeString = (string: any, type: string, openTag: string, endTag: string) => {
  if (string.includes(type)) {
    var replaceAll = string.replaceAll(type, '#*#');

    var size = (replaceAll.match(/#*#/g) || [])?.length;
    var data = replaceAll;
    for (let i = 0; i < size / 2; i++) {
      data = data.replace('#*#', openTag).replace('#*#', endTag);
    }
    return data;
  } else {
    return string;
  }
};

const changeStringSingleTag = (string: any, type: string, openTag: string) => {
  if (string.includes(type)) {
    var replaceAll = string.replaceAll(type, '#*#');

    var size = (replaceAll.match(/#*#/g) || [])?.length;
    var data = replaceAll;
    for (let i = 0; i < size; i++) {
      data = data.replace('#*#', openTag);
    }
    return data;
  } else {
    return string;
  }
};

export const description = (string: any) => {
  if (string) {
    return changeToStrong(`${string}`);
  }
  return '';
};

// export function extractContent(s: any) {
//   s = changeStringSingleTag(s, '\\r\\n', '\n\n');
//   const [finalText,setFinalText] = useState('');
//   useEffect(() =>{
//      var span = document.createElement('span');
//      var anchor = document.createElement('a'); // span and anchor not needed for card elements
//      span.innerHTML = s;
//      if(s.length) setFinalText(span.textContent + ' ' + anchor || span.innerText + ' ' + anchor);
//   },[])
//   return finalText;
// }

export const markDownForList = (string: any) => {
  if (string) {
    return markDownForListContent(`${string}`);
  }
  return '';
};

export const capitlizeFirst = (str: string | null) => {
  // checks for null, undefined and empty string
  if (!str) return '';
  return str.match('^[a-z]') ? str.charAt(0).toUpperCase() + str.substring(1) : str;
};
