export function paramsJsonParse(itemRef: any[] | object): any[] | object {
  let result;
  if (!itemRef) {
    return itemRef;
  }
  if (Array.isArray(itemRef)) {
    result = itemRef.map((elem) => checkParamIsJson(elem));
  } else if (typeof itemRef === 'object') {
    result = checkParamIsJson(itemRef);
  } else {
    return itemRef;
  }

  return result;
}

export function checkParamIsJson(item: any) {
  for (const key in item) {
    if (validJsonStr(item[key])) {
      item[key] = JSON.parse(item[key]);
    }
  }
  return item;
}

export function validJsonStr(str: any) {
  if (str === null || str === 'null') return false;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function sortArray(array: any[], key: any = null, ascending = true) {
  return array.slice().sort((a, b) => {
    const valA = key ? a[key] : a;
    const valB = key ? b[key] : b;

    if (typeof valA === 'string') {
      return ascending
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return ascending
      ? valA - valB
      : valB - valA;
  });
}
