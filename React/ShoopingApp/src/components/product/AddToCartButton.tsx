'use client';
import { Button } from '@mui/material';
import { ShoppingCart } from 'lucide-react';
import { useCartStore, Product } from '@/store/useCartStore';

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem);

  return (
    <Button
      variant="contained"
      fullWidth
      startIcon={<ShoppingCart size={16} />}
      onClick={(e) => { e.preventDefault(); addItem(product); }}
      sx={{ 
        py: 1, 
        textTransform: 'none', 
        fontWeight: 600,
        borderRadius: 2,
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none', bgcolor: 'primary.dark' }
      }}
    >
      Add to Cart
    </Button>
  );
}
