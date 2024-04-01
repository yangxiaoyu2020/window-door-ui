import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import AppRouter from '../../routers/Routers';


const MainContent = () => {
    return (
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon />}
            sx={{ pl: 0 }}
          >
            <Typography color="neutral">
              <Link
                underline="none"
                color="inherit"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
            </Typography>
            <Typography color="neutral">
              <Link
                underline="hover"
                color="inherit"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
            </Typography>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              Orders
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h2" component="h1">
            Orders
          </Typography>
        </Box>
        <AppRouter />
      </Box>
    );
  };

export default MainContent;
