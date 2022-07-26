/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React from 'react';
import { IllustratedMessage, Heading, Content } from '@adobe/react-spectrum';
import NotFound from '@spectrum-icons/illustrations/NotFound';

export default ({ message = 'There was an error!' }) => (
  <IllustratedMessage marginTop="size-1000">
    <NotFound />
    <Heading>An error has occured</Heading>
    <Content>{message}</Content>
  </IllustratedMessage>
);
