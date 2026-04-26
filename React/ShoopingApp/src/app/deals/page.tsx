'use client';
import { Box, Container, Typography, Chip, CircularProgress } from '@mui/material';
import { Flame } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/store/useCartStore';

interface DummyProduct extends Product {
  discountPercentage?: number;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<DummyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=150')
      .then(res => res.json())
      .then(data => {
        // Filter for products with a high discount percentage
        const hotDeals = data.products
          .filter((p: DummyProduct) => (p.discountPercentage || 0) > 12)
          .sort((a: DummyProduct, b: DummyProduct) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        
        setDeals(hotDeals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 16, pb: 10 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Flame size={40} color="#ef4444" />
            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              Hot Deals
            </Typography>
            <Flame size={40} color="#ef4444" />
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
            Grab these limited-time offers before they're gone! Massive discounts on our most popular products.
          </Typography>
          {!loading && (
            <Chip 
              label={`${deals.length} ITEMS ON SALE`} 
              sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.05em' }} 
            />
          )}
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="error" />
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
