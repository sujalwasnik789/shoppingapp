'use client';
import { AppBar, Toolbar, Typography, IconButton, Badge, InputBase, Box, useTheme as useMuiTheme } from '@mui/material';
import { ShoppingCart, Search, User, Heart } from 'lucide-react';
import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';
import CartDrawer from './CartDrawer';
import { styled } from '@mui/material/styles';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useState, useEffect } from 'react';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 999,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
  border: `1px solid ${theme.palette.divider}`,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 2, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  fontFamily: theme.typography.h1.fontFamily,
  transition: 'color 0.2s',
  '&:hover': { color: theme.palette.primary.main },
}));

import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { isLoaded, userId } = useAuth();
  const muiTheme = useMuiTheme();
  const getCartCount = useCartStore(state => state.getCartCount);
  const getWishlistCount = useWishlistStore(state => state.getWishlistCount);
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const cartCount = mounted ? getCartCount() : 0;
  const wishlistCount = mounted ? getWishlistCount() : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(28, 28, 33, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          color: muiTheme.palette.text.primary,
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
          backgroundImage: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1440, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography variant="h5" component={Link} href="/" sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 800, letterSpacing: '-0.02em' }}>
              ShopKit
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {[
                { label: 'Shop', href: '/products' },
                { label: 'Categories', href: '/categories' },
                { label: 'Deals', href: '/deals' },
                { label: 'Orders', href: '/orders' }
              ].map(link => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <NavLink 
                    key={link.label} 
                    href={link.href} 
                    sx={{ 
                      color: isActive ? 'primary.main' : 'text.secondary', 
                      borderBottom: isActive ? '2px solid' : 'none', 
                      borderColor: 'primary.main', 
                      pb: 0.5 
                    }}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Box component="form" onSubmit={handleSearch} sx={{ display: { xs: 'none', lg: 'flex' } }}>
              <SearchContainer>
                <SearchIconWrapper>
                  <Search size={18} />
                </SearchIconWrapper>
                <StyledInputBase 
                  placeholder="Search products..." 
                  inputProps={{ 'aria-label': 'search' }} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchContainer>
            </Box>

            <ThemeToggle />
            
            <IconButton color="inherit" component={Link} href="/wishlist">
              <Badge badgeContent={wishlistCount} color="error" invisible={wishlistCount === 0}>
                <Heart size={24} strokeWidth={1.5} />
              </Badge>
            </IconButton>

            <IconButton color="inherit" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cartCount} color="secondary" invisible={cartCount === 0}>
                <ShoppingCart size={24} strokeWidth={1.5} />
              </Badge>
            </IconButton>

            {isLoaded && userId ? (
              <UserButton />
            ) : (
              <IconButton color="inherit" component={Link} href="/sign-in">
                <User size={24} strokeWidth={1.5} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
