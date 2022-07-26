/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

/* eslint-disable camelcase */
'use strict';

const validators = require('./dataValidation');
const getConfig = require('./configConstants');
/**
 * Returns the formatted error for reactor console
 * @param {string} err
 * @returns {error: string}
 */
function logError(err) {
  return {
    error: err
  };
}
/**
 *
 * @param {*} context
 * @returns
 */
module.exports = function (context) {
  const sendData = require('./sendData');
  const { arc, utils } = context;
  const data = utils.getSettings();
  const listId = data.listid;
  const email = data.email;

  let reqBody;
  const { token, siteurl } = utils.getExtensionSettings();
  if (!validators.emailCheck(email)) {
    return logError('Invalid email');
  }
  const hash = crypto.subtle.digest('MD5', new TextEncoder().encode(email));
  let emailHash;
  return hash.then('success').then(
    function (value) {
      var hexCodes = [];
      var view = new DataView(value);
      for (var i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        var value1 = view.getUint32(i);
        // toString(16) will give the hex representation of the number without padding
        var stringValue = value1.toString(16);
        // We use concatenation and slice for padding
        var padding = '00000000';
        var paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
      }
      emailHash = hexCodes.join('');
      const apiUrl =
        getConfig.HTTPS +
        siteurl +
        '/3.0/lists/' +
        listId +
        '/members/' +
        emailHash +
        '/events';
      if (data) {
        if (data.properties !== '' && data.properties !== null) {
          if (!validators.objectCheck(data.properties)) {
            return logError('Invalid Properties');
          }
        }
        let nameVal = data.name.split(' ');
        nameVal = nameVal.length > 1 ? nameVal.join('_') : data.name;
        const is_Sync = data.is_syncing === 'true' ? true : false;
        const currentTimestamp = data.occurred_at
          ? data.occurred_at
          : new Date().toISOString().split('.')[0] + 'Z';
        reqBody = {
          name: nameVal,
          properties: data.properties,
          is_syncing: is_Sync,
          occurred_at: data.occurred_at
        };
      }

      return sendData(arc, utils, reqBody, apiUrl);
    },
    function (value) {
      return 'failed';
    }
  );
};
