/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

'use strict';

const validationCheck = {};

/**
 * Checks whether the given email is valid
 * @param {string} email
 * @returns {boolean}
 */
validationCheck.emailCheck = function (email) {
  // eslint-disable-next-line max-len
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

/**
 *
 * @param {*} properties
 * @returns {boolean}
 */
validationCheck.objectCheck = function (properties) {
  if (typeof properties === 'object' && properties !== null) return true;
};
module.exports = validationCheck;
