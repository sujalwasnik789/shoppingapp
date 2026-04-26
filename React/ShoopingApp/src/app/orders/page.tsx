'use client';
import { Box, Container, Typography, Button } from '@mui/material';
import { PackageSearch, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 16, pb: 10 }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ 
          textAlign: 'center', 
          py: 12, 
          px: 4, 
          bgcolor: 'background.paper', 
          borderRadius: 4, 
          border: '1px solid', 
          borderColor: 'divider',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{ p: 3, borderRadius: '50%', bgcolor: 'primary.light', color: 'white', display: 'flex' }}>
              <PackageSearch size={48} />
            </Box>
          </Box>
          
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            No Recent Orders
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', mb: 6 }}>
            Looks like you haven't made any purchases recently. When you place an order using our secure Stripe checkout, it will appear here.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              component={Link} 
              href="/products" 
              variant="contained" 
              size="large" 
              startIcon={<ShoppingBag size={20} />}
              sx={{ 
                borderRadius: 2, 
                px: 4, 
                py: 1.5, 
                fontWeight: 700, 
                textTransform: 'none',
                fontSize: '1rem' 
              }}
            >
              Start Shopping
            </Button>
            
            <Button 
              component={Link} 
              href="/deals" 
              variant="outlined" 
              size="large" 
              sx={{ 
                borderRadius: 2, 
                px: 4, 
                py: 1.5, 
                fontWeight: 700, 
                textTransform: 'none',
                fontSize: '1rem',
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' }
              }}
            >
              View Deals
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
