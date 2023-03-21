import React from 'react'

export const SearchBox = (props) => {
const {searchValue,setSearchValue} = props
  return (
    <div className='col col-sm-4'>
        <input className='form-control'
        placeholder='Type to search ...'
        onChange={(e) => setSearchValue(e.target.value)}
        value ={searchValue}
        ></input>
    </div>
  )
}
