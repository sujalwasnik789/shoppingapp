'use client';
import { Box, Container, Typography, Card, Button, Checkbox, FormControlLabel, Slider, IconButton, Select, MenuItem, Chip, Divider } from '@mui/material';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, Product } from '@/store/useCartStore';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';

interface DummyProduct extends Product {
  category: string;
  discountPercentage?: number;
}

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');
  
  const [products, setProducts] = useState<DummyProduct[]>([]);
  const [allProducts, setAllProducts] = useState<DummyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryQuery ? [categoryQuery] : []);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const addItem = useCartStore(state => state.addItem);
  const itemsPerPage = 8;
  
  useEffect(() => {
    if (categoryQuery && !selectedCategories.includes(categoryQuery)) {
      setSelectedCategories([categoryQuery]);
    }
  }, [categoryQuery]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products);
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = [...new Set(allProducts.map(p => p.category))];

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setProducts(filtered);
    setPage(1);
  }, [allProducts, selectedCategories, priceRange, sortBy]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 16, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">Loading products...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 12, pb: 10 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'primary.main' } }} component={Link} href="/">Home</Typography>
          <ChevronRight size={14} color="#999" />
          <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'primary.main' }}>Products</Typography>
        </Box>
      </Box>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>All Products</Typography>
        <Chip label={`${products.length} ITEMS`} size="small" sx={{ bgcolor: 'primary.light', color: 'white', fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.05em', height: 24 }} />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Sidebar Filters */}
        <Box sx={{ display: { xs: 'none', lg: 'block' }, width: 280, flexShrink: 0 }}>
          <Card sx={{ p: 3, position: 'sticky', top: 96 }}>
            {/* Categories */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Categories</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 4 }}>
              {categories.slice(0, 8).map(cat => (
                <FormControlLabel
                  key={cat}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      size="small"
                      sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: selectedCategories.includes(cat) ? 'primary.main' : 'text.secondary', fontWeight: selectedCategories.includes(cat) ? 600 : 400, textTransform: 'capitalize' }}>
                      {cat.replace('-', ' ')}
                    </Typography>
                  }
                />
              ))}
            </Box>

            {/* Price Range */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Price Range</Typography>
            <Box sx={{ px: 1, mb: 4 }}>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                min={0}
                max={5000}
                sx={{ color: 'primary.main' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Box sx={{ bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', px: 1.5, py: 0.5, borderRadius: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>${priceRange[0]}</Typography>
                </Box>
                <Box sx={{ bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', px: 1.5, py: 0.5, borderRadius: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>${priceRange[1].toLocaleString()}</Typography>
                </Box>
              </Box>
            </Box>

            {/* Customer Ratings */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Customer Ratings</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
              {[4, 3].map(rating => (
                <Box key={rating} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  <Box sx={{ display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={14} fill={i <= rating ? '#f59e0b' : 'none'} color={i <= rating ? '#f59e0b' : '#ccc'} />
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary">& Up</Typography>
                </Box>
              ))}
            </Box>

            <Button variant="contained" fullWidth sx={{ bgcolor: '#1a1c1c', color: 'white', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.05em', py: 1.5, '&:hover': { bgcolor: '#000' } }}>
              RESET FILTERS
            </Button>
          </Card>
        </Box>

        {/* Product Grid */}
        <Box sx={{ flex: 1 }}>
          {/* Sort bar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Showing <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, products.length)}</Box> of {products.length} results
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Sort by:</Typography>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
                variant="standard"
                disableUnderline
                sx={{ fontSize: '0.875rem' }}
              >
                <MenuItem value="newest">Newest Arrivals</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 3 }}>
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                sx={{ minWidth: 40, height: 40, borderColor: 'divider', color: 'text.secondary' }}
              >
                <ChevronLeft size={16} />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setPage(pageNum)}
                    sx={{
                      minWidth: 40,
                      height: 40,
                      ...(pageNum === page
                        ? { bgcolor: 'primary.main', color: 'white' }
                        : { borderColor: 'divider', color: 'text.primary' })
                    }}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && page < totalPages - 2 && (
                <>
                  <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>...</Box>
                  <Button variant="outlined" size="small" onClick={() => setPage(totalPages)} sx={{ minWidth: 40, height: 40, borderColor: 'divider', color: 'text.primary' }}>
                    {totalPages}
                  </Button>
                </>
              )}
              <Button
                variant="outlined"
                size="small"
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                sx={{ minWidth: 40, height: 40, borderColor: 'divider', color: 'text.secondary' }}
              >
                <ChevronRight size={16} />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Box sx={{ pt: 16, textAlign: 'center' }}><Typography>Loading products...</Typography></Box>}>
      <ProductsPageContent />
    </Suspense>
  );
}
