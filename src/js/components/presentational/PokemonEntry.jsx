import React from "react";
import PropTypes from "prop-types";

const PokemonEntry = ({ tree, pokeballs, gameOrder, onClick }) => (

  <tr className="pokemon-entry" id={'pokemon-' + tree[0].dexNumber}>
    <td>
      <a onClick={onClick} href={tree[0].dexNumber}>
        #{tree[0].dexNumber} {tree[0].species}
      </a>
    </td>
      { Object.keys( pokeballs ).map( ( pokeball ) => {

        var available = false;

        for ( var pokemonIndex in tree ) {

          var pokemon = tree[ pokemonIndex ];
        
          for ( var gameIndex in gameOrder ) {

            if ( typeof pokemon[ gameIndex ] !== 'undefined' && 
              typeof pokemon[ gameIndex ].pokeballs !== 'undefined' && 
              pokemon[ gameIndex ].pokeballs.indexOf( pokeball ) >= 0 ) {
                available = true;
                break;
            }

          }

          if ( available ) break;

        }

        return <td className={pokeball + ' pokeball-available'} key={tree[0].dexNumber + '-' + pokeball}>{ ( available ) ? <span className="fas fa-check"></span> : <span className="fas fa-times"></span> }</td>

      } ) }
  </tr>
);

PokemonEntry.propTypes = {
  tree: PropTypes.array.isRequired,
  pokeballs: PropTypes.object.isRequired,
  gameOrder: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PokemonEntry;