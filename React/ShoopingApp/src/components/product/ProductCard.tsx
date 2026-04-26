'use client';
import { Box, Card, Typography, IconButton } from '@mui/material';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore, Product } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useEffect, useState } from 'react';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  const isSaved = mounted ? isInWishlist(product.id) : false;

  return (
    <Card sx={{ overflow: 'hidden', p: 0, height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s', '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }, '&:hover img': { transform: 'scale(1.1)' }, '&:hover .favBtn': { opacity: 1 } }}>
      <Box component={Link} href={`/products/${product.id}`} sx={{ display: 'block', position: 'relative', pt: '100%', bgcolor: 'action.hover', overflow: 'hidden' }}>
        <Image src={product.thumbnail} alt={product.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
        <IconButton 
          className={isSaved ? "" : "favBtn"} 
          size="small" 
          onClick={(e) => { e.preventDefault(); toggleItem(product); }}
          sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', opacity: isSaved ? 1 : 0, transition: 'opacity 0.2s', '&:hover': { color: 'error.main' }, color: isSaved ? 'error.main' : 'inherit' }}
        >
          <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
        </IconButton>
      </Box>
      <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: '0.6rem', letterSpacing: '0.05em', display: 'block', mb: 0.5 }}>
            {product.category?.toUpperCase().replace('-', ' ') || 'PRODUCT'}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, transition: 'color 0.2s', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Box sx={{ display: 'flex', color: '#f59e0b', mr: 1 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < Math.round(product.rating || 0) ? "currentColor" : "none"} />
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary">
              ({Math.floor(Math.random() * 300) + 20})
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ color: 'text.primary', fontSize: '1.1rem', mb: 1.5, fontWeight: 700 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <AddToCartButton product={product} />
        </Box>
      </Box>
    </Card>
  );
}
