/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

'use strict';

const byteArrayToString = (buf) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

/**
 *
 * @param {*} arc
 * @param {*} utils
 * @param {*} data
 * @returns  makes api call
 */
module.exports = (arc, utils, data, apiUrl) => {
  const { fetch } = utils;
  const token = utils.getExtensionSettings().token;
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  };
  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }
  return fetch(apiUrl, fetchOptions).then((r) => {
    const accRuleStash = arc.ruleStash['message'] || {
      responses: {}
    };
    return r
      .arrayBuffer()
      .then(byteArrayToString)
      .then((bodyResponse) => {
        accRuleStash.responses['responseBody'] = bodyResponse;
        return accRuleStash;
      });
  });
};
