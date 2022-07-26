/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
const jsonData = require('./formConstant.json');

export default (values) => {
  // return values;
  const combinedObj = {};
  jsonData.form.forEach((key) => {
    combinedObj[key.name] = values?.[key.name] || "";
  });
  combinedObj.is_syncing = (values?.is_syncing===null||values?.is_syncing==="")?"false":values?.is_syncing;

  return combinedObj;
};
