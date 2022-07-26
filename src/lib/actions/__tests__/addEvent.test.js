/* eslint-disable camelcase */
/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

'use strict';

const addEvent = require('../addEvent');
var sendData = require('../sendData');

describe('custom code action addevent', () => {
  test('should save the user-defined function result to the correct key', () => {
    var settings = {
      name: 'test',
      properties: {},
      is_syncing: false,
      occurred_at: 'test'
    };

    var extensionSettings = {
      siteurl: 'test',
      token: 'abc',
      listid: 'abc',
      email: 'abc'
    };

    var arc = {
      ruleStash: {}
    };

    var utils = {
      fetch: () => {},
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };
    var obj = addEvent({ arc, utils });
    expect(obj).toEqual({
      error: 'Invalid email'
    });
  });

  test('checking property', () => {
    var settings = {
      name: 'test',
      properties: '',
      is_syncing: false,
      occurred_at: 'test'
    };

    var extensionSettings = {
      siteurl: 'test',
      token: 'abc',
      listid: 'abc',
      email: 'abc@tetst.com'
    };

    var arc = {
      ruleStash: {}
    };

    var utils = {
      fetch: () => {},
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };
    var obj = addEvent({ arc, utils });
    expect(obj).toEqual({
      error: 'Invalid Properties'
    });
  });

  test('checking for SendData API call', () => {
    const result = {
      name: 'test',
      properties: {},
      is_syncing: false,
      occured_at: 'test'
    };
    var settings = {
      name: 'test',
      properties: {},
      is_syncing: false,
      occurred_at: 'test'
    };

    var extensionSettings = {
      siteurl: 'test',
      token: 'abc',
      listid: 'abc',
      email: 'abc@tetst.com'
    };

    var arc = {
      ruleStash: {}
    };
    const fetch = jest.fn(() =>
      Promise.resolve({
        arrayBuffer: () => Promise.resolve([114, 101, 115, 117, 108, 116]) //result
      })
    );
    var utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };
    const apiURL =
      'https://test/3.0/lists/abc/members/53b62bdde573065496860ae22c1cad15/events';
    return sendData(arc, utils, result, apiURL).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://test/3.0/lists/abc/members/53b62bdde573065496860ae22c1cad15/events',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + 'abc',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result)
        }
      );
    });
  });
  test('checking for SendData API call responce', () => {
    const result = {
      name: 'test',
      properties: {},
      is_syncing: false,
      occured_at: 'test'
    };
    var settings = {
      name: 'test',
      properties: {},
      is_syncing: false,
      occurred_at: 'test'
    };

    var extensionSettings = {
      siteurl: 'test',
      token: 'abc',
      listid: 'abc',
      email: 'abc@tetst.com'
    };

    var arc = {
      ruleStash: {}
    };
    const fetch = jest.fn(() =>
      Promise.resolve({
        arrayBuffer: () => Promise.resolve([114, 101, 115, 117, 108, 116]) //result
      })
    );
    var utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };
    const apiURL =
      'https://test/3.0/lists/abc/members/53b62bdde573065496860ae22c1cad15/events';
    const apiResult = { responses: { responseBody: 'result' } };
    return sendData(arc, utils, result, apiURL).then((r) => {
      expect(r).toStrictEqual(apiResult);
    });
  });
});
