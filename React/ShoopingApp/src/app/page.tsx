'use client';
import { Box, Typography, Button, Container, Grid, useTheme, Card } from '@mui/material';
import { Star, ChevronLeft, ChevronRight, Truck, ShieldCheck, Leaf, Heart } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { keyframes } from '@mui/system';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/store/useCartStore';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

export default function LandingPage() {
  const theme = useTheme();
  const { isLoaded, userId } = useAuth();
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=4&sortBy=rating&order=desc')
      .then(res => res.json())
      .then(data => setTrendingProducts(data.products))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', pt: 8 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #3B4FD8 0%, #6B7FF0 50%, #8B97F3 100%)',
          minHeight: { xs: '600px', lg: '870px' },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          py: 10
        }}
      >
        {/* Mesh Blobs */}
        <Box sx={{ position: 'absolute', width: 600, height: 600, bgcolor: '#fea619', filter: 'blur(120px)', opacity: 0.3, top: -200, right: -100, borderRadius: '50%' }} />
        <Box sx={{ position: 'absolute', width: 400, height: 400, bgcolor: '#1c33c0', filter: 'blur(100px)', opacity: 0.4, bottom: -100, left: -50, borderRadius: '50%' }} />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10, px: { xs: 3, md: 8 } }}>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', mb: 4 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#fea619', animation: `${pulse} 2s infinite` }} />
                <Typography variant="overline" sx={{ color: 'white', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.65rem' }}>
                  NEW SPRING COLLECTION AVAILABLE
                </Typography>
              </Box>
              
              <Typography variant="h1" sx={{ color: 'white', fontSize: { xs: '3rem', md: '4rem' }, lineHeight: 1.05, mb: 3, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                Shop the latest.<br/>Delivered fast.
              </Typography>
              
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem', maxWidth: 600, mb: 4 }}>
                Experience the next generation of online shopping. High-fidelity curation meets lightning-fast logistics for your modern lifestyle.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  component={Link} 
                  href={isLoaded && userId ? "/products" : "/sign-in"}
                  variant="contained" 
                  color="secondary"
                  sx={{ py: 2, px: 4, borderRadius: 3, boxShadow: '0 10px 25px rgba(133,83,0,0.2)' }}
                >
                  {isLoaded && userId ? "Start Shopping" : "Get Started"}
                </Button>
                <Button 
                  component={Link} 
                  href="/products" 
                  variant="outlined" 
                  sx={{ py: 2, px: 4, borderRadius: 3, color: 'white', borderColor: 'rgba(255,255,255,0.3)', bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)', borderColor: 'white' } }}
                >
                  Browse Products
                </Button>
              </Box>

              {/* Stats Grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, pt: 6, mt: 6, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '1.5rem' }}>10K+</Typography>
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', lineHeight: 1 }}>Products</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    4.8 <Star color="#fea619" size={20} fill="#fea619" />
                  </Typography>
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', lineHeight: 1 }}>Global Rating</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '1.5rem' }}>Free</Typography>
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', lineHeight: 1 }}>Returns</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, lg: 6 }} sx={{ display: { xs: 'none', lg: 'block' }, position: 'relative' }}>
              <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(63,81,181,0.2)', filter: 'blur(60px)', borderRadius: '50%', zIndex: -1 }} />
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, p: 3, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                <Box sx={{ position: 'relative', width: '100%', height: 500, borderRadius: 4, overflow: 'hidden' }}>
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAePsh-BRpgs-Yk_lgPpQZvH87rwbVDPtxmwz76xwmBzdt4mn8FYtMetS5y8SMJ-OHSYAK1FiTroMg8DDk-jwzlZBBtpNi2vADLPfMKZWqjtrqo9cqG1uWo1ND3QeSmrCR0wyWzOmCC3RmN5furVEgOQBd7UgdsC3qw0nO9mDzFPCu9w6PFgunKN7gidrYJ9_em2-wdmi3ojlZMWDiVKATEJ07eGFsyUsxi5qnSh9-ntruTx-6W2Ggr9L-dUIn69dMNussKLBkYxA4" alt="Luxury Watch" fill style={{ objectFit: 'cover' }} />
                </Box>
                <Box sx={{ position: 'absolute', bottom: 40, left: 40, right: 40, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', p: 3, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#1a1c1c', fontWeight: 700 }}>Nordic Chronograph</Typography>
                    <Typography variant="body2" sx={{ color: '#757686' }}>Limited Edition Silver</Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ color: '#1c33c0', fontSize: '1.5rem' }}>$249.00</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories Bento Grid */}
      <Container maxWidth="xl" sx={{ py: 10, px: { xs: 3, md: 8 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
          <Box>
            <Typography variant="h2" color="text.primary">Browse by Category</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>Explore our premium selection across multiple departments.</Typography>
          </Box>
          <Button component={Link} href="/categories" endIcon={<ChevronRight size={16} />} sx={{ fontWeight: 600 }}>View All</Button>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gridTemplateRows: { xs: 'auto', md: 'repeat(2, 300px)' }, gap: 3 }}>
          {/* Featured Category */}
          <Box component={Link} href="/products?category=womens-dresses" sx={{ gridColumn: { md: 'span 2' }, gridRow: { md: 'span 2' }, display: 'block', position: 'relative', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', '&:hover img': { transform: 'scale(1.05)' } }}>
            <Box component="img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6GrWLVjCe9UGZlSiHiOM0jplDC4KPulotOCXM_vUeMNVX9CBRkFKL7YtFIc13Dnhk-6ztCUXAzvdnyyUA5jqFKnz89WM8MKFblW-_LskGZ4r1vEMat1wc6tmK0UrndVujISwXnR06vdI-t9_SJbyqaj3g1DBTJtIfTkvETbtcm1CLQUkod0T1SbfKWVF-WCC7bj-x7Epm5dqcGi-Gal0x8NXJwaMLNovugZlPcwDrC2aOEzprNfXn6lgDJ063uEgCN3Qir_58VkM" alt="Fashion" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)' }} />
            <Box sx={{ position: 'absolute', bottom: 32, left: 32 }}>
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em' }}>Premium selection</Typography>
              <Typography variant="h3" color="white" sx={{ mt: 1 }}>Fashion</Typography>
              <Typography color="rgba(255,255,255,0.8)" sx={{ mt: 1 }}>Discover curated trends for the new season.</Typography>
            </Box>
          </Box>
          
          <Box component={Link} href="/products?category=smartphones" sx={{ gridColumn: { md: 'span 2' }, display: 'block', position: 'relative', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', '&:hover img': { transform: 'scale(1.05)' } }}>
            <Box component="img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHHKGb_UzDoQs3DTEWpCpmXLmA_3bhVmTfhxRoJBOI1zDO3X1ZJwqH5kLBdttohDiBZbuR3ksvlmxObwLl8n12RsIM2b3_rJBj_7dZbQDKi5uL6_MZFwoXrjZzKxZsW0QOriBWgoRWkB0UTkcIfZqpwSjToazrEacUYgq8RmTSvNL09EKxPtkAjIfWxMI6KBdc0i4Efx7SwDNN74U2ThB-zPjnv3RNPlPesJxhS7ayfENxq7Y2Yup9Vds23ZwnJtn31__swtS5XzU" alt="Electronics" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,51,192,0.6), transparent)' }} />
            <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" color="white">Electronics</Typography>
              <Typography color="rgba(255,255,255,0.7)" variant="body2" sx={{ mt: 1 }}>Cutting edge performance.</Typography>
            </Box>
          </Box>
          
          <Box component={Link} href="/products?category=home-decoration" sx={{ display: 'block', position: 'relative', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', '&:hover img': { transform: 'scale(1.05)' } }}>
            <Box component="img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtGSRo2cMyj6DChjDdXakBEq015Sz0lBulimFVMX5BYhtV9g2RtHE7EC-9TgPlQSTuxdCKPf0AomZEb8aD1iAJSV0Z2ka5ewGHWlp8j3EOhUzsFnHDAWex_0CGntdP5EAQeJeN30Q08-90ZkHK1tg-W7MmVdfj-ogCyFk-j3pIq8nqnnu_Rl3QGpEMfUL0_f9_4yQ3xTe_vKaaOUeKsIcjJUgIYWEKC5RVIpjDIB-izdyHxB2KWv4orhITvyntiMFpPgp073m7Rn0" alt="Home" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', transition: 'background-color 0.3s', '&:hover': { bgcolor: 'rgba(0,0,0,0.3)' } }} />
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" color="white">Home</Typography>
            </Box>
          </Box>
          
          <Box component={Link} href="/products?category=beauty" sx={{ display: 'block', position: 'relative', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', '&:hover img': { transform: 'scale(1.05)' } }}>
            <Box component="img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyxVFCVH51xE5gfAtI9GpzBxodys1mZaLN-alce3NaNGRdG_30C_P5A6HeaukXLNMh9PcKgi_8bMe2I6AZy0bzrzPwzuXoHxsx3sBfejTwXZW1F3rzfmyzBOyNqi_CteAKDCfzUDPxRj5IP8C1BMPRWQqbW-dUmzS7nvN4W7DNc3xbSDYY991Tt2mHUGHqiwxUzezlgPv88wxQbsLHyxCS46tIgCB92722Q4w9M5NVqgl9zWjAmT1kdtX4AYh8nCVwQUvVg3Mj7qM" alt="Beauty" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', transition: 'background-color 0.3s', '&:hover': { bgcolor: 'rgba(0,0,0,0.3)' } }} />
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" color="white">Beauty</Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Trending Products */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f9f9f9', py: 10 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 6 }}>
            <Typography variant="h2" color="text.primary">Trending Now</Typography>
            <Button component={Link} href="/products" endIcon={<ChevronRight size={16} />} sx={{ fontWeight: 600 }}>
              View All
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {trendingProducts.length > 0 ? trendingProducts.map((prod) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={prod.id}>
                <ProductCard product={prod} />
              </Grid>
            )) : [...Array(4)].map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
                <Box sx={{ pt: '150%', bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 3, animation: `${pulse} 2s infinite` }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features USP Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
          <Grid container spacing={6}>
            {[
              { icon: <Truck size={32} />, title: 'Fast Delivery', desc: 'Free shipping on all orders over $50 with real-time tracking.' },
              { icon: <ShieldCheck size={32} />, title: 'Secure Payments', desc: 'Shop with confidence using our 256-bit encrypted checkout.' },
              { icon: <Leaf size={32} />, title: 'Eco Conscious', desc: 'Sustainable packaging and carbon-neutral shipping available.' }
            ].map((feature, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Box sx={{ width: 64, height: 64, bgcolor: 'primary.light', opacity: 0.1, borderRadius: 4, position: 'absolute' }} />
                  <Box sx={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>{feature.title}</Typography>
                  <Typography color="text.secondary" sx={{ maxWidth: 300 }}>{feature.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#fafafa', py: 8, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
          <Grid container spacing={8} sx={{ mb: 8 }}>
            <Grid size={{ xs: 12, lg: 3 }}>
              <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 800, letterSpacing: '-0.02em', mb: 2 }}>ShopKit</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>The world's most curated marketplace for premium digital-age essentials.</Typography>
            </Grid>
            <Grid size={{ xs: 12, lg: 9 }}>
              <Grid container spacing={4}>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="overline" sx={{ color: 'text.primary', fontWeight: 700, display: 'block', mb: 3 }}>Company</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['About Us', 'Careers', 'Affiliates'].map(link => (
                      <Typography key={link} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>{link}</Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="overline" sx={{ color: 'text.primary', fontWeight: 700, display: 'block', mb: 3 }}>Support</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['Contact Us', 'Shipping Info', 'Returns'].map(link => (
                      <Typography key={link} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>{link}</Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="overline" sx={{ color: 'text.primary', fontWeight: 700, display: 'block', mb: 3 }}>Legal</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['Privacy Policy', 'Terms of Service'].map(link => (
                      <Typography key={link} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>{link}</Typography>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ pt: 4, borderTop: '1px solid', borderColor: 'divider', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" color="text.secondary">© 2024 ShopKit. All rights reserved.</Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              {['Terms', 'Privacy', 'Cookies'].map(link => (
                <Typography key={link} variant="caption" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}>{link}</Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
