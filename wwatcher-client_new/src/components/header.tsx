import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';

interface HeaderProps {
  itemCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ itemCount, sortBy, onSortChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="body1">{itemCount} ITEMS</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          SORT BY:
        </Typography>
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as string)}
          displayEmpty
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="price-low-high">Price — Low to High</MenuItem>
          <MenuItem value="price-high-low">Price — High to Low</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default Header;
