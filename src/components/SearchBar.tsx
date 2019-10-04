import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { searchBarStyle } from '../style/Styles';

// The search bar react component
export const SearchBar = (): JSX.Element => {
    // Style
    const style = searchBarStyle();

    // Render the jsx
    return (
        <div className={style.search}>
            <div className={style.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: style.inputRoot,
                    input: style.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
};
