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
