/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent } from '@testing-library/react';

// eslint-disable-next-line import/prefer-default-export
export const inputOnChange = (input, value) =>
  fireEvent.change(input, {
    target: { value }
  });
