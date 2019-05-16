import React from "react";
import PropTypes from "prop-types";
  
const PokeballFilter = ({ pokeball, pokeballs, onChange }) => (
<label htmlFor={pokeball + '-filter'}>
    <input type="checkbox" id={pokeball + '-filter'} name="selectedPokeballs" value={pokeball} onChange={onChange} />
    <img src={'dist/images/' + pokeball + '.png'} alt={pokeballs[ pokeball ]} title={pokeballs[ pokeball ]} />
</label>
);

PokeballFilter.propTypes = {
    pokeball: PropTypes.string.isRequired,
    pokeballs: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default PokeballFilter;