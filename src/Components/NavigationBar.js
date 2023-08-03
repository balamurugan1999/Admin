import React from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function NavigationBar() {
    const handleToken=()=>{
        sessionStorage.removeItem('tokenValue')
        localStorage.setItem('Auth',false)
    }
  return (
    <div>
       <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Welcome Admin !
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/home"
              sx={{ my: 1, mx: 1.5 }}
            >
              User Details
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/forms"
              sx={{ my: 1, mx: 1.5 }}
            >
              Forms
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/aboutus"
              sx={{ my: 1, mx: 1.5 }}
            >
              About US
            </Link>
          </nav>
          <Button href="/" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={handleToken}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavigationBar
