/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { Provider, lightTheme } from '@adobe/react-spectrum';

export default (View) => {
  render(
    <Provider colorScheme="light" theme={lightTheme}>
      <View />
    </Provider>
  );
};
