import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid,
  Divider,
  IconButton
} from '@mui/material';
import { 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              SEO Tools
            </Typography>
            <Typography variant="body2">
              Comprehensive SEO solutions for your digital presence.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" display="block" mb={1}>Home</Link>
              <Link href="/tools" color="inherit" display="block" mb={1}>Tools</Link>
              <Link href="/pricing" color="inherit" display="block" mb={1}>Pricing</Link>
              <Link href="/about" color="inherit" display="block">About</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box>
              <Link href="/privacy" color="inherit" display="block" mb={1}>Privacy Policy</Link>
              <Link href="/terms" color="inherit" display="block" mb={1}>Terms of Service</Link>
              <Link href="/cookies" color="inherit" display="block">Cookie Policy</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" href="https://linkedin.com" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="Instagram" href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} SEO Tools. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;