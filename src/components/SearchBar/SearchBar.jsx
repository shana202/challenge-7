import React, { useState, useRef, useEffect } from 'react';


function SearchBar({ query, onSearch}) {
    const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
    
    
        

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => onSearch(e.target.value)}
                />
        </div>
    );
}

export default SearchBar;