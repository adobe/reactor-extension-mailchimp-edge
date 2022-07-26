/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

/* istanbul ignore file */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, lightTheme } from '@adobe/react-spectrum';

import './global.styl';

export default (View) => {
  ReactDOM.render(
    <Provider colorScheme="light" theme={lightTheme}>
      <View />
    </Provider>,
    document.getElementById('content')
  );
};
