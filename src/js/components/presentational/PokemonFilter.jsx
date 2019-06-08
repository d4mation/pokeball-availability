import React from "react";
import PropTypes from "prop-types";
import InputBoxDoneTyping from 'react-input-box-done-typing';
  
const PokemonFilter = ({ search, onChange }) => (
<label htmlFor={'pokemon-filter'}>
    Search by Pokémon Name or National Dex Number.
    <InputBoxDoneTyping type="text" id="pokemon-filter" name="search" value={search} doneTyping={onChange} autoComplete="off" />
</label>
);

PokemonFilter.propTypes = {
    search: PropTypes.string.isRequired,
};

export default PokemonFilter;