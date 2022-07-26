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

import Configuration from '../configuration';
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
  MailchimpDomain: screen.queryByLabelText(
    /Mailchimp Server Prefix Domain Name/i
  ),
  Mailchimptoken: screen.queryByLabelText(/Mailchimp token/i),
  MailchimpListid: screen.queryByLabelText(/List-Id/i),
  MailchimpEmail: screen.queryByLabelText(/Email-Id/i)
});

describe('Configuration view', () => {
  beforeEach(() => {
    renderView(Configuration);
  });

  test('Setting and validating configuration fields', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          siteurl: 'test',
          token: 'abc',
          listid: '',
          email: 'abc@tetst.com'
        }
      });
    });

    const { MailchimpDomain } = getFromFields();
    const { Mailchimptoken } = getFromFields();
    const { MailchimpListid } = getFromFields();
    const { MailchimpEmail } = getFromFields();

    expect(MailchimpDomain.value).toBe('test');
    expect(Mailchimptoken.value).toBe('abc');
    expect(MailchimpListid.value).toBe('');
    expect(MailchimpEmail.value).toBe('abc@tetst.com');

    expect(extensionBridge.getSettings()).toStrictEqual({
      siteurl: 'test',
      token: 'abc',
      listid: '',
      email: 'abc@tetst.com'
    });
    await act(async () => {
      inputOnChange(MailchimpDomain, 'testvalue');
      inputOnChange(Mailchimptoken, '');
      inputOnChange(MailchimpListid, 'abc');
      inputOnChange(MailchimpEmail, 'abc@gmail.com');
    });
    expect(MailchimpDomain.value).toBe('testvalue');
    expect(Mailchimptoken.value).toBe('');
    expect(MailchimpListid.value).toBe('abc');
    expect(MailchimpEmail.value).toBe('abc@gmail.com');

    // Check fields type.
    expect(MailchimpDomain).toHaveAttribute('type', 'text');
    expect(Mailchimptoken).toHaveAttribute('type', 'password');
    expect(MailchimpListid).toHaveAttribute('type', 'text');
    expect(MailchimpEmail).toHaveAttribute('type', 'text');

    extensionBridge.validate();
  });
  test('Check validation for action fields', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          siteurl: 'test',
          token: 'abc',
          listid: '',
          email: 'abc@tetst.com'
        }
      });
    });
    const { MailchimpDomain, Mailchimptoken, MailchimpListid, MailchimpEmail } =
      getFromFields();

    // Check fields are not already invalid.
    expect(MailchimpDomain).not.toHaveAttribute('aria-invalid');
    expect(Mailchimptoken).not.toHaveAttribute('aria-invalid');
    expect(MailchimpListid).not.toHaveAttribute('aria-invalid');
    expect(MailchimpEmail).not.toHaveAttribute('aria-invalid');

    // Validate case when is empty and value is not.
    inputOnChange(MailchimpDomain, '');
    inputOnChange(Mailchimptoken, '');
    inputOnChange(MailchimpListid, '');
    inputOnChange(MailchimpEmail, '');

    await act(async () => {
      extensionBridge.validate();
    });

    expect(MailchimpDomain).toHaveAttribute('aria-invalid', 'true');
    expect(Mailchimptoken).toHaveAttribute('aria-invalid', 'true');
    expect(MailchimpListid).toHaveAttribute('aria-invalid', 'true');
    expect(MailchimpEmail).toHaveAttribute('aria-invalid', 'true');
  });
});
