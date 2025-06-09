import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material'; // Keep only this import

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '0',
      period: 'forever',
      features: [
        'Limited tool access',
        'Basic reports',
        'Community support',
        '5 checks per day'
      ],
      cta: 'Get Started',
      variant: 'outlined'
    },
    {
      name: 'Pro',
      price: '9',
      period: 'per month',
      features: [
        'Full tool access',
        'Advanced reports',
        'Priority support',
        'Unlimited checks',
        'API access',
        'Team features'
      ],
      cta: 'Subscribe Now',
      variant: 'contained',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'All Pro features',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'On-premise deployment'
      ],
      cta: 'Contact Sales',
      variant: 'outlined'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={8}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Simple, Transparent Pricing
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Choose the plan that fits your needs
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="flex-end">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              elevation={plan.highlighted ? 6 : 2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: plan.highlighted ? '2px solid' : '',
                borderColor: plan.highlighted ? 'primary.main' : '',
                transform: plan.highlighted ? 'scale(1.03)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom textAlign="center">
                  {plan.name}
                </Typography>
                
                <Box textAlign="center" my={3}>
                  <Typography variant="h3" component="div">
                    {plan.price === '0' ? 'Free' : `$${plan.price}`}
                  </Typography>
                  {plan.period && (
                    <Typography color="text.secondary">
                      {plan.period}
                    </Typography>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <List>
                  {plan.features.map((feature, idx) => (
                    <ListItem key={idx} disableGutters>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <Typography variant="body1">{feature}</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              
              <Box p={2} textAlign="center">
                <Button 
                  variant={plan.variant} 
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  {plan.cta}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing;
