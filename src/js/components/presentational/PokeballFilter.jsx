import React from "react";
import PropTypes from "prop-types";
  
const PokeballFilter = ({ pokeball, onChange }) => (
<label htmlFor={pokeball + '-filter'}>
    <input type="checkbox" id={pokeball + '-filter'} name="pokeball" value={pokeball} onChange={onChange} />
    {pokeball}
</label>
);

PokeballFilter.propTypes = {
pokeball: PropTypes.string.isRequired,
};

export default PokeballFilter;