'use client';
import { Box, Container, Typography, Button, Card } from '@mui/material';
import { Search, Headset, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 10, px: 4 }}>
        <Box sx={{ maxWidth: 1000, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          {/* Decorative blur blob */}
          <Box sx={{ position: 'relative', py: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'absolute', width: 600, height: 600, bgcolor: 'primary.main', opacity: 0.05, filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }} />
            
            <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '5rem' }, fontWeight: 800, color: 'primary.main', letterSpacing: '-0.02em', lineHeight: 1.1, position: 'relative', zIndex: 1, textShadow: '0 2px 8px rgba(28,51,192,0.1)' }}>
              404
            </Typography>
            
            <Typography variant="h3" sx={{ fontWeight: 700, mt: 2, position: 'relative', zIndex: 1 }}>
              Page not found
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mt: 3, maxWidth: 400, fontSize: '1.1rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
              The page you're looking for doesn't exist. It might have been moved, deleted, or perhaps it never existed in the first place.
            </Typography>

            <Box sx={{ mt: 6, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <Button 
                component={Link} 
                href="/" 
                variant="contained" 
                size="large"
                sx={{ px: 5, py: 1.8, borderRadius: 3, fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(28,51,192,0.2)' }}
              >
                Back to Home
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ px: 5, py: 1.8, borderRadius: 3, fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', borderColor: 'divider', color: 'text.primary' }}
              >
                Report Issue
              </Button>
            </Box>
          </Box>

          {/* Suggestion Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mt: 6, width: '100%' }}>
            {[
              { icon: <Search size={24} />, title: 'Explore All', desc: 'Discover our latest arrivals and seasonal collections.', link: 'Go to Shop', href: '/products', color: '#dfe0ff', iconColor: 'primary.main' },
              { icon: <Headset size={24} />, title: 'Help Center', desc: 'Need assistance? Our support team is here to help you 24/7.', link: 'Contact Us', href: '#', color: '#ffddb8', iconColor: '#855300' },
              { icon: <Tag size={24} />, title: 'Best Deals', desc: "Don't miss out on our limited time offers and discounts.", link: 'View Offers', href: '/products', color: '#c8f7d5', iconColor: '#005421' },
            ].map((card, i) => (
              <Card key={i} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', transition: 'all 0.3s', '&:hover': { borderColor: 'primary.main' } }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.iconColor, mb: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}>
                  {card.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{card.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>{card.desc}</Typography>
                <Typography component={Link} href={card.href} variant="caption" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  {card.link} <ArrowRight size={14} />
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
