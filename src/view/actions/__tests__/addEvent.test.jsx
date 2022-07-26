/* eslint-disable camelcase */
/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

/* eslint-disable no-template-curly-in-string */

import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderView from '../../__tests_helpers__/renderView';
import { inputOnChange } from '../../__tests_helpers__/jsDomHelpers';

import AddEvent from '../addEvent';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFromFields = () => ({
  Name: screen.queryByLabelText(/Name/i),
  Properties: screen.queryByLabelText(/Properties/i),
  Is_syncing: screen.queryByLabelText(/Is_syncing/i),
  Occurred_at: screen.queryByLabelText(/Occurred_at/i)
});

describe('Send data view', () => {
  beforeEach(() => {
    renderView(AddEvent);
  });

  test('Set action view', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          name: 'test',
          properties: '',
          is_syncing: 'true',
          occurred_at: 'abc'
        }
      });
    });

    const { Name } = getFromFields();
    const { Properties } = getFromFields();
    const { Is_syncing } = getFromFields();
    const { Occurred_at } = getFromFields();

    expect(Name.value).toBe('test');
    expect(Properties.value).toBe('');
    expect(Is_syncing.value).toBe('true');
    expect(Occurred_at.value).toBe('abc');

    expect(extensionBridge.getSettings()).toStrictEqual({
      name: 'test',
      properties: '',
      is_syncing: 'true',
      occurred_at: 'abc'
    });

    await act(async () => {
      inputOnChange(Name, 'testvalue');
      inputOnChange(Properties, '');
      inputOnChange(Is_syncing, 'true');
      inputOnChange(Occurred_at, 'xyz');
    });
    expect(Name.value).toBe('testvalue');
    expect(Properties.value).toBe('');
    expect(Is_syncing.value).toBe('true');
    expect(Occurred_at.value).toBe('xyz');

    // Check fields type.
    expect(Name).toHaveAttribute('type', 'text');
    expect(Properties).toHaveAttribute('type', 'text');
    expect(Is_syncing).toHaveAttribute('type', 'text');
    expect(Occurred_at).toHaveAttribute('type', 'text');

    extensionBridge.validate();
  });
  test('Check validation for action fields', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          name: 'test',
          properties: '',
          is_syncing: 'true',
          occurred_at: 'abc'
        }
      });
    });
    const { Name, Properties, Is_syncing, Occurred_at } = getFromFields();

    // Check fields are not already invalid.
    expect(Name).not.toHaveAttribute('aria-invalid');
    expect(Properties).not.toHaveAttribute('aria-invalid');
    expect(Is_syncing).not.toHaveAttribute('aria-invalid');
    expect(Occurred_at).not.toHaveAttribute('aria-invalid');

    // Validate case when is empty and value is not.
    inputOnChange(Name, '');
    inputOnChange(Properties, '');
    inputOnChange(Is_syncing, '');
    inputOnChange(Occurred_at, '');

    await act(async () => {
      extensionBridge.validate();
    });

    expect(Name).toHaveAttribute('aria-invalid', 'true');
    expect(Properties).toHaveAttribute('aria-invalid', 'true');
    expect(Is_syncing).toHaveAttribute('aria-invalid', 'true');
    expect(Occurred_at).toHaveAttribute('aria-invalid', 'true');
  });
});
