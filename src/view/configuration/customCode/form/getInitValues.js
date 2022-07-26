/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
const jsonData = require('./formConstant.json');

export default ({ settings }) => {
  const combinedObj = {};
  jsonData.form.forEach((key) => {
    combinedObj[key.name] = settings?.[key.name] || '';
  });
  return combinedObj;
};
