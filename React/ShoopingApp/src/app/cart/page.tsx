'use client';
import { Box, Container, Typography, Grid, Card, CardContent, Button, IconButton, Divider } from '@mui/material';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to checkout');
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 16, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Your cart is empty.</Typography>
        <Button component={Link} href="/products" variant="contained" size="large">
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Typography variant="h3" sx={{ mb: 6, fontWeight: 'bold' }}>Your Cart</Typography>
      
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          {items.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 3, p: 2 }}>
              <Box sx={{ position: 'relative', width: 120, height: 120, bgcolor: 'background.default', borderRadius: 2, overflow: 'hidden' }}>
                <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: 'contain' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </IconButton>
                    <Typography sx={{ px: 2 }}>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </IconButton>
                  </Box>
                  <IconButton color="error" onClick={() => removeItem(item.id)}>
                    <Trash2 size={20} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Order Summary</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography sx={{ fontWeight: 600 }}>${getCartTotal().toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography sx={{ fontWeight: 600 }}>Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800 }}>
                ${getCartTotal().toFixed(2)}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              fullWidth 
              endIcon={<ArrowRight />}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
