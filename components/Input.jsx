import React from 'react'

const Input = ({searchValue, handleSearch, option}) => {
    return (
        <>
            <input type="text" placeholder="Введите УИН" list="uins"
                value={searchValue} onChange={handleSearch} required
                minLength="20" maxLength="25"
            />
            <datalist id="uins">
                {searchValue.length >= 19 && searchValue.length <= 24 && option && 
                    <option value={searchValue.replace(' ', '') + option} />}
            </datalist>
        </>
    )
};

export default Input
