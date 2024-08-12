import React from 'react';
import { Typography } from '@mui/material';

interface SearchResultsProps {
  searchText?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchText }) => {
  if (!searchText) return null;

  return (
    <Typography variant="body1" sx={{ mb: 2 }}>
      Search results for: "{searchText}"
    </Typography>
  );
};

export default SearchResults;
