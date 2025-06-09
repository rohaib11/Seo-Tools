import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Avatar,
  Paper,
  useTheme
} from '@mui/material';
import { 
  Engineering as EngineeringIcon,
  Analytics as AnalyticsIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'SEO expert with 10+ years of experience in digital marketing.'
    },
    {
      name: 'Maria Garcia',
      role: 'Lead Developer',
      bio: 'Full-stack developer specializing in web performance optimization.'
    },
    {
      name: 'Sam Wilson',
      role: 'Product Manager',
      bio: 'Focuses on creating tools that solve real SEO challenges.'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50+', label: 'SEO Tools' },
    { value: '24/7', label: 'Support' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={8}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          About SEO Tools
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Empowering your digital success
        </Typography>
      </Box>

      <Grid container spacing={6} mb={8}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Our Mission
          </Typography>
          <Typography paragraph>
            At SEO Tools, we believe that everyone should have access to powerful 
            SEO resources regardless of their budget or technical expertise. Our 
            mission is to democratize search engine optimization by providing 
            intuitive, accurate tools that help businesses of all sizes improve 
            their online visibility.
          </Typography>
          <Typography paragraph>
            Founded in 2023, we've grown from a simple keyword research tool to 
            a comprehensive SEO platform serving thousands of users worldwide.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Why Choose Us?
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={3}>
                  <EngineeringIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Expert Tools</Typography>
                    <Typography variant="body2">Built by SEO professionals</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" mb={3}>
                  <AnalyticsIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Data-Driven</Typography>
                    <Typography variant="body2">Accurate, reliable metrics</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <SecurityIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Privacy Focused</Typography>
                    <Typography variant="body2">Your data stays yours</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Box textAlign="center" mb={8}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Our Team
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          The passionate people behind SEO Tools
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box 
                sx={{ 
                  p: 3,
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Avatar
                  alt={member.name}
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto', 
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                    fontSize: '3rem'
                  }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography color="primary" mb={2}>
                  {member.role}
                </Typography>
                <Typography variant="body2">
                  {member.bio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', py: 6, borderRadius: 2 }}>
        <Grid container spacing={3} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box textAlign="center">
                <Typography variant="h3" color="primary" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="h6">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;