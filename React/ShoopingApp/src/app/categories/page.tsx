'use client';
import { Box, Container, Typography, Card, CardActionArea } from '@mui/material';
import { Layers } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Category {
  slug: string;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        // Handle both old string array format and new object array format from dummyjson
        const formatted = data.map((item: any) => {
          if (typeof item === 'string') {
            return { slug: item, name: item.replace('-', ' ') };
          }
          return { slug: item.slug, name: item.name };
        });
        setCategories(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 16, pb: 10 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Shop by Category
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Explore our wide range of products organized perfectly for you. 
            Find exactly what you're looking for across our entire catalog.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <Typography>Loading categories...</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            {categories.map((cat) => (
              <Card 
                key={cat.slug} 
                sx={{ 
                  borderRadius: 4, 
                  border: '1px solid', 
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
                  }
                }}
              >
                <CardActionArea 
                  component={Link} 
                  href={`/products?category=${cat.slug}`}
                  sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
                >
                  <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'primary.light', color: 'white', display: 'flex' }}>
                    <Layers size={32} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, textTransform: 'capitalize', textAlign: 'center' }}>
                    {cat.name}
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
