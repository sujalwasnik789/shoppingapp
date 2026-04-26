'use client';
import { Drawer, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount } = useCartStore();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 380 },
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
          }
        },
        backdrop: {
          sx: {
            bgcolor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
          }
        }
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Your Cart</Typography>
          <Typography variant="body2" color="text.secondary">{getCartCount()} items in your bag</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Cart Items */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2 }}>
        {items.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2 }}>
            <ShoppingBag size={48} color="#ccc" />
            <Typography variant="body1" color="text.secondary">Your cart is empty</Typography>
            <Button variant="contained" component={Link} href="/products" onClick={onClose} size="small">
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {items.map(item => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: 96, height: 96, borderRadius: 2, overflow: 'hidden', bgcolor: '#f4f4f5', flexShrink: 0, position: 'relative' }}>
                  <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: 'cover' }} />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: '0.85rem' }}>${item.price.toFixed(2)}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">{item.category || 'Product'}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                      <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} sx={{ p: 0.5 }}>
                        <Minus size={14} />
                      </IconButton>
                      <Typography variant="body2" sx={{ px: 1.5, fontWeight: 500 }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)} sx={{ p: 0.5 }}>
                        <Plus size={14} />
                      </IconButton>
                    </Box>
                    <Typography 
                      variant="caption" 
                      color="error.main" 
                      sx={{ fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Footer */}
      {items.length > 0 && (
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Subtotal</Typography>
            <Typography variant="subtitle1" sx={{ fontSize: '0.85rem' }}>${getCartTotal().toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Shipping</Typography>
            <Typography variant="body2" color="text.secondary">Calculated at checkout</Typography>
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
            <Typography variant="subtitle1" color="primary.main" sx={{ fontSize: '1.5rem' }}>${getCartTotal().toFixed(2)}</Typography>
          </Box>
          <Button 
            variant="contained" 
            fullWidth 
            component={Link} 
            href="/cart"
            onClick={onClose}
            sx={{ py: 1.8, borderRadius: 3, fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(28,51,192,0.2)' }, transition: 'all 0.2s' }}
          >
            PROCEED TO CHECKOUT
          </Button>
          <Button 
            fullWidth 
            sx={{ mt: 1.5, color: 'text.secondary', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
            onClick={onClose}
          >
            Continue Shopping
          </Button>
        </Box>
      )}
    </Drawer>
  );
}
