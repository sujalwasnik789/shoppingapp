'use client';
import { Box, Container, Typography, Grid, Divider, Button, IconButton, Chip, Tabs, Tab } from '@mui/material';
import { ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Star, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, Product } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useState, useEffect, use } from 'react';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const { id } = use(params);
  const addItem = useCartStore(state => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    params.then(({ id }) => {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    });
  }, [params]);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 16, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">Loading...</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const discountPercent = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
  const originalPrice = discountPercent > 0 ? (product.price / (1 - discountPercent / 100)) : null;

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 10 }}>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'primary.main' } }} component={Link} href="/">Shop</Typography>
        <ChevronRight size={14} color="#999" />
        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'primary.main' } }} component={Link} href="/products">{product.category}</Typography>
        <ChevronRight size={14} color="#999" />
        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'primary.main' }}>{product.title}</Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Image Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: 'relative', pt: '100%', bgcolor: 'background.paper', borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
            <Image src={product.thumbnail} alt={product.title} fill style={{ objectFit: 'contain', padding: '24px' }} />
            <IconButton 
              onClick={() => toggleItem(product)}
              sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', color: mounted && isInWishlist(product.id) ? 'error.main' : 'text.secondary', '&:hover': { color: 'error.main' } }}
            >
              <Heart size={20} fill={mounted && isInWishlist(product.id) ? "currentColor" : "none"} />
            </IconButton>
          </Box>
          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
              {product.images.slice(0, 4).map((img: string, i: number) => (
                <Box key={i} sx={{ position: 'relative', width: 80, height: 80, borderRadius: 2, overflow: 'hidden', border: i === 0 ? '2px solid' : '1px solid', borderColor: i === 0 ? 'primary.main' : 'divider', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}>
                  <Image src={img} alt={`${product.title} ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        {/* Details Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
              {product.brand ? `${product.brand}` : 'NEW ARRIVAL'} | {product.category?.toUpperCase()}
            </Typography>
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>{product.title}</Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Box sx={{ display: 'flex' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={16} fill={i <= Math.round(product.rating || 0) ? '#f59e0b' : 'none'} color={i <= Math.round(product.rating || 0) ? '#f59e0b' : '#ccc'} />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">({product.reviews?.length || 0} Customer Reviews)</Typography>
          </Box>

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontSize: '1.5rem', color: 'text.primary' }}>
              ${product.price.toFixed(2)}
            </Typography>
            {originalPrice && (
              <>
                <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                  ${originalPrice.toFixed(2)}
                </Typography>
                <Chip label={`${discountPercent}% OFF`} size="small" sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '0.7rem' }} />
              </>
            )}
          </Box>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>Description</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
            {product.description}
          </Typography>

          {/* Quantity & Add to Cart */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <IconButton size="small" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus size={18} />
              </IconButton>
              <Typography sx={{ px: 2.5, fontWeight: 600 }}>{quantity}</Typography>
              <IconButton size="small" onClick={() => setQuantity(q => q + 1)}>
                <Plus size={18} />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCart size={20} />}
              onClick={handleAddToCart}
              sx={{ py: 1.8, borderRadius: 2, fontWeight: 700, fontSize: '0.9rem' }}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Features */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 3, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
            {[
              { icon: <Truck size={20} />, label: 'Free Delivery' },
              { icon: <Shield size={20} />, label: '2 Year Warranty' },
              { icon: <RotateCcw size={20} />, label: '30-Day Returns' }
            ].map((feat, i) => (
              <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ color: 'text.secondary' }}>{feat.icon}</Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{feat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Product Details / Specs / Reviews Tabs */}
      <Box sx={{ mt: 8 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 4 }}>
          <Tab label="Product Details" sx={{ fontWeight: 600, textTransform: 'none' }} />
          <Tab label="Specifications" sx={{ fontWeight: 600, textTransform: 'none' }} />
          <Tab label={`Reviews (${product.reviews?.length || 0})`} sx={{ fontWeight: 600, textTransform: 'none' }} />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>About this product</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {product.description}
            </Typography>
            {product.tags && (
              <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                {product.tags.map((tag: string) => (
                  <Chip key={tag} label={tag} variant="outlined" size="small" />
                ))}
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
            {[
              { label: 'Brand', value: product.brand },
              { label: 'Category', value: product.category },
              { label: 'SKU', value: product.sku },
              { label: 'Weight', value: `${product.weight}g` },
              { label: 'Dimensions', value: product.dimensions ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` : 'N/A' },
              { label: 'Warranty', value: product.warrantyInformation },
              { label: 'Shipping', value: product.shippingInformation },
              { label: 'Availability', value: product.availabilityStatus },
            ].filter(s => s.value).map((spec, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">{spec.label}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{spec.value}</Typography>
              </Box>
            ))}
          </Box>
        )}

        {activeTab === 2 && product.reviews && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {product.reviews.map((review: any, i: number) => (
              <Box key={i} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{review.reviewerName}</Typography>
                  <Box sx={{ display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={14} fill={s <= review.rating ? '#f59e0b' : 'none'} color={s <= review.rating ? '#f59e0b' : '#ccc'} />
                    ))}
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
