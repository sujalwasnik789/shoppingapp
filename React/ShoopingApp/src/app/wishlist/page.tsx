'use client';
import { Box, Container, Typography, Card, Button, Chip } from '@mui/material';
import { ChevronRight, SortDesc, Shirt, Smartphone, Home, Sparkles, Dumbbell, Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlistStore } from '@/store/useWishlistStore';
import ProductCard from '@/components/product/ProductCard';
import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore(state => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 10 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        {/* Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'primary.main' } }} component={Link} href="/">Home</Typography>
          <ChevronRight size={14} color="#999" />
          <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'primary.main' }}>Wishlist</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Side Navbar (Design 06) */}
          <Box sx={{ display: { xs: 'none', lg: 'block' }, width: 280, flexShrink: 0 }}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ px: 1, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>Categories</Typography>
                <Typography variant="caption" color="text.secondary">Browse by department</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {[
                  { icon: <Shirt size={20} />, label: 'Fashion', href: '/products' },
                  { icon: <Smartphone size={20} />, label: 'Electronics', href: '/products' },
                  { icon: <Home size={20} />, label: 'Home', href: '/products' },
                  { icon: <Sparkles size={20} />, label: 'Beauty', href: '/products' },
                  { icon: <Dumbbell size={20} />, label: 'Sports', href: '/products' },
                ].map((cat, i) => (
                  <Button
                    key={i}
                    component={Link}
                    href={cat.href}
                    variant="text"
                    startIcon={cat.icon}
                    sx={{ 
                      justifyContent: 'flex-start', 
                      color: 'text.secondary', 
                      px: 2, 
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': { bgcolor: 'action.hover', transform: 'translateX(4px)' },
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat.label}
                  </Button>
                ))}
              </Box>
            </Card>
          </Box>

          {/* Main Content */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>Saved Items</Typography>
                <Chip label={`${items.length} ITEMS`} size="small" sx={{ bgcolor: 'primary.light', color: 'white', fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.05em', height: 24 }} />
              </Box>
              <Button 
                variant="outlined" 
                startIcon={<SortDesc size={18} />}
                sx={{ 
                  borderRadius: 2, 
                  color: 'text.primary', 
                  borderColor: 'divider',
                  textTransform: 'none',
                  fontWeight: 600,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'action.hover', borderColor: 'divider' }
                }}
              >
                Recently Added
              </Button>
            </Box>

            {/* Grid */}
            {items.length > 0 ? (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }, gap: 3 }}>
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Heart size={48} color="#ccc" style={{ margin: '0 auto', marginBottom: 16 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Your wishlist is empty</Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>Save items you love to review them later.</Typography>
                <Button component={Link} href="/products" variant="contained" size="large" sx={{ borderRadius: 2 }}>
                  Discover Products
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
