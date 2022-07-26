/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
const jsonData = require('./formConstant.json');

export default (values) => {
  const errors = {};
  jsonData.form.forEach((key) => {
    if (!values[key.name] && key.mandatory) {
      errors[key.name] = `Enter ${key.label}`;
    }
  });
  if (!values.is_syncing) {
    errors.is_syncing = 'Please specify a Is_syncing';
  }
  return errors;
};
