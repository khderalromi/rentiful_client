
"use client"
import React, { Suspense } from 'react';
import SearchContent from './SearchContent';


const SearchPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

export default SearchPage;