import React, { useState } from 'react';


function SearchBar({ query, onSearch}) {
    
    
    
        

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => onSearch(e.target.value)}
                />
        </div>
    );
}

export default SearchBar;