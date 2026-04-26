'use client';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import { Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/store/useCartStore';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 16, pb: 10 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        {/* Search Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
            {query ? `Results for "${query}"` : 'All Products'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {loading ? 'Searching...' : `Showing ${results.length} items found`}
          </Typography>
        </Box>

        {/* Filter Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 6 }}>
          <Button 
            variant="contained" 
            startIcon={<Filter size={18} />}
            sx={{ borderRadius: 6, textTransform: 'none', fontWeight: 600, px: 3 }}
          >
            All Filters
          </Button>
          <Box sx={{ width: 1, height: 24, bgcolor: 'divider', mx: 1 }} />
          {['Price: Low to High', 'Newest', 'Top Rated', 'Free Shipping'].map((filter, i) => (
            <Button
              key={i}
              variant="outlined"
              sx={{ 
                borderRadius: 6, 
                textTransform: 'none', 
                fontWeight: 600, 
                px: 3, 
                color: 'text.primary', 
                borderColor: 'divider',
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover', borderColor: 'divider' }
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>

        {/* Results Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : results.length > 0 ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>No results found</Typography>
            <Typography color="text.secondary">Try adjusting your search query or filters.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Box sx={{ pt: 16, textAlign: 'center' }}><CircularProgress /></Box>}>
      <SearchResultsContent />
    </Suspense>
  );
}
