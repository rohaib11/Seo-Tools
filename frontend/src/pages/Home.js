import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  useTheme
} from '@mui/material';
import { 
  Article as ArticleIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as AnalyticsIcon
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <SearchIcon fontSize="large" />,
      title: 'Plagiarism Checker',
      description: 'Ensure your content is unique and original with our advanced plagiarism detection.'
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: 'SEO Analyzer',
      description: 'Optimize your website for search engines with our comprehensive SEO tools.'
    },
    {
      icon: <ArticleIcon fontSize="large" />,
      title: 'Content Tools',
      description: 'Improve your writing with readability scores, keyword density analysis and more.'
    },
    {
      icon: <AnalyticsIcon fontSize="large" />,
      title: 'Performance Metrics',
      description: 'Track your website performance with detailed analytics and reports.'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          my: 8,
          textAlign: 'center',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Boost Your Online Presence
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Comprehensive SEO tools to help you rank higher and grow your business
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ my: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Button 
          variant="contained" 
          size="large" 
          href="/tools"
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Explore All Tools
        </Button>
      </Box>
    </Container>
  );
};

export default Home;