/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import '@testing-library/jest-dom';

// Force screen width, otherwise the Mobile Combobox or Picker will be rendered inside the tests.
jest
  .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
  .mockImplementation(() => 1000);
jest
  .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
  .mockImplementation(() => 1000);

jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
