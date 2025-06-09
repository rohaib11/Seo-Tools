import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: isMobile ? 1 : 0
            }}
          >
            SEO TOOLS
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                <MenuItem component={Link} to="/tools" onClick={handleMenuClose}>Tools</MenuItem>
                <MenuItem component={Link} to="/pricing" onClick={handleMenuClose}>Pricing</MenuItem>
                <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', ml: 'auto', gap: 1 }}>
              <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 600 }}>Home</Button>
              <Button color="inherit" component={Link} to="/tools" sx={{ fontWeight: 600 }}>Tools</Button>
              <Button color="inherit" component={Link} to="/pricing" sx={{ fontWeight: 600 }}>Pricing</Button>
              <Button color="inherit" component={Link} to="/about" sx={{ fontWeight: 600 }}>About</Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;