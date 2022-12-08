import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { Navigate } from 'react-router-dom';

function handleClick(page) {
  const navigation = Navigate();
  event.preventDefault();
  navigation(page);
}

export default function BreadCrumb({ parentPageName, parentPage, currentPageName }) {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={parentPage}
      onClick={() => handleClick(parentPage)}>
      {parentPageName}
    </Link>,
    <Typography key="3" color="text.primary">
      {currentPageName}
    </Typography>
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
