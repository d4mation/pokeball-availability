import React from "react";
import PropTypes from "prop-types";
  
const PokemonFilter = ({ search, onChange }) => (
<label htmlFor={'pokemon-filter'}>
    Search by Pokemon Name or National Dex Number
    <input type="text" id="pokemon-filter" name="search" value={search} onChange={onChange} />
</label>
);

PokemonFilter.propTypes = {
    search: PropTypes.string.isRequired,
};

export default PokemonFilter;