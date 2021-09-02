import React from 'react'
// styles
import './index.scss'

const SEARCH_ICON = 'https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png'

const Search = ({ onSearch }) =>
    <div className="search" >
        <input autoComplete="off"
            className="search__input"
            name='search'
            placeholder="search"
            type='text' onChange={(e) => onSearch(e.target.value)}
        />
        <div className="search__separator" />
        <img className="search__icon" alt="search" src={SEARCH_ICON} />
    </div >

export default Search
