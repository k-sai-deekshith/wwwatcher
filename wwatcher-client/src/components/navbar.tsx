import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Box } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SideNav from './sidenav';
import Marquee from 'react-fast-marquee';

interface LogoProps {
    theme: Theme;
}

interface NavLinkWrapperProps {
    children: React.ReactNode;
    selected: boolean;
    onClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ theme }) => (
    <Typography
        variant="h6"
        sx={{
            fontWeight: 'bold',
            fontSize: '1.8rem',
            letterSpacing: '0.1em',
            color: theme.palette.primary.main,
            padding: theme.spacing(2),
        }}
    >
        WWWATCHER
    </Typography>
);

const NavLinkWrapper: React.FC<NavLinkWrapperProps> = ({ children, selected, onClick }) => {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
                marginX: theme.spacing(1.5),
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: theme.spacing(1, 2),
                color: theme.palette.text.primary,
                display: 'inline-block',
                textAlign: 'center',
                '&:hover': {
                    color: theme.palette.background.default,
                    backgroundColor: theme.palette.secondary.main,
                },
            }}
        >
            {children}
        </Box>
    );
};

const Navbar: React.FC = () => {
    const theme = useTheme();
    const [selectedLink, setSelectedLink] = useState<string>('WOMEN');
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [sendSearchText, setSendSearchText] = useState<string>('');

    const handleSearchToggle = () => {
        setSendSearchText(searchText);
        setSearchOpen(!searchOpen);
    };

    return (
        <>
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <div
            style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.background.default, 
                padding: '10px',
            }}
        >
            <Marquee>
                LIFETIME JEWELLERY WARRANTY & 30 DAYS RETURNS COMPLIMENTARY WORLDWIDE DELIVERY
                LIFETIME JEWELLERY WARRANTY & 30 DAYS RETURNS COMPLIMENTARY WORLDWIDE DELIVERY
                LIFETIME JEWELLERY WARRANTY & 30 DAYS RETURNS COMPLIMENTARY WORLDWIDE DELIVERY
            </Marquee>
        </div>
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '80px',
                    paddingX: theme.spacing(2),
                }}
            >
                <Logo theme={theme} />

                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing(2), flexGrow: '4'
                }}>
                    {['NEW', 'WOMEN', 'MEN', 'BESTSELLING'].map((link) => (
                        <NavLinkWrapper
                            key={link}
                            selected={selectedLink === link}
                            onClick={() => setSelectedLink(link)}
                        >
                            <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                                {link}
                            </Typography>
                        </NavLinkWrapper>
                    ))}
                </Box>

                {/* Search and Cart */}
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing(2),
                }}>
                    <Box
                        sx={{
                            display: !searchOpen ? 'none' : 'flex',
                            alignItems: 'center',
                            backgroundColor: theme.palette.background.default,
                            paddingLeft: theme.spacing(1),
                            transition: theme.transitions.create('width'),
                            width: searchOpen ? '200px' : '0',
                            overflow: 'hidden',
                            marginRight: theme.spacing(1.5),
                            borderRadius:"10px"
                        }}
                    >
                        <InputBase
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search…"
                            sx={{ color: 'inherit', fontSize: '1.5rem' }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Box>
                    <IconButton onClick={handleSearchToggle} sx={{ fontSize: '1.5rem' }}>
                        <SearchIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton color="inherit" sx={{ marginLeft: theme.spacing(1.5), fontSize: '1.5rem' }}>
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCartIcon fontSize="inherit" />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        <SideNav search={sendSearchText} />
        </>
    );
};

export default Navbar;
