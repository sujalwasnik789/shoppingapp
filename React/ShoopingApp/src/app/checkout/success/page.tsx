'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useEffect } from 'react';

export default function SuccessPage() {
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Container maxWidth="sm" sx={{ py: 15, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', color: 'success.main', mb: 3 }}>
        <CheckCircle size={64} />
      </Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>Payment Successful!</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Thank you for your order. We will send you a confirmation email shortly.
      </Typography>
      <Button component={Link} href="/products" variant="contained" size="large">
        Continue Shopping
      </Button>
    </Container>
  );
}
