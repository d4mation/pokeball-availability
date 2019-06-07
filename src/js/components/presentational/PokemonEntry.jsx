import React from "react";
import PropTypes from "prop-types";
import ToolTip from "react-tooltip";

const PokemonEntry = ({ tree, pokeballs, gameOrder, onClick, breedingExclusions, hiddenAbilityPokeballs }) => (

  <tr className="pokemon-entry" id={'pokemon-' + tree[0].dexNumber}>
    <td>
      <a onClick={onClick} href={tree[0].dexNumber}>
        #{tree[0].dexNumber} {tree[0].species}
      </a>
    </td>
      { Object.keys( pokeballs ).map( ( pokeball ) => {

        var available = false,
          showHiddenAbilityWarning = false;

        for ( var pokemonIndex in tree ) {

          var pokemon = tree[ pokemonIndex ];
        
          for ( var gameIndex in gameOrder ) {

            if ( typeof pokemon[ gameIndex ] !== 'undefined' && 
              typeof pokemon[ gameIndex ].pokeballs !== 'undefined' && 
              typeof pokemon[ gameIndex ].pokeballs[ pokeball ] !== 'undefined' ) {

                available = true;

                // If this Pokemon cannot breed its Hidden Ability onto another Pokeball
                // And this Pokeball is not one the Hidden Ability can naturally be caught in
                // Show a note saying that the Hidden Ability cannot be obtained in that Pokeball for the Evolution Tree
                if ( breedingExclusions.indexOf( pokemon.dexNumber ) > -1 && 
                hiddenAbilityPokeballs.indexOf( pokeball ) < 0 ) {

                  showHiddenAbilityWarning = true;

                }

                break;

            }

          }

          if ( available ) break;

        }

        return <td className={pokeball + ' pokeball-available'} key={tree[0].dexNumber + '-' + pokeball}>

            { ( showHiddenAbilityWarning ) ? ( ( available ) ? <span data-tip data-for={pokeball + '-' + pokemon.dexNumber + '-notes'} className="fas fa-check"></span> : <span className="fas fa-times"></span> ) : ( available ) ? <span className="fas fa-check"></span> : <span className="fas fa-times"></span> }

            { ( showHiddenAbilityWarning ) ? <ToolTip id={pokeball + '-' + pokemon.dexNumber + '-notes'}><span>Hidden Ability not possible in this Poké Ball</span></ToolTip> : '' }
        </td>

      } ) }
  </tr>
);

PokemonEntry.propTypes = {
  tree: PropTypes.array.isRequired,
  pokeballs: PropTypes.object.isRequired,
  gameOrder: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  breedingExclusions: PropTypes.array.isRequired,
};

export default PokemonEntry;