import React from "react";
import PropTypes from "prop-types";

const gameOrder = [
  'ruby',
  'sapphire',
  'firered',
  'leafgreen',
  'emerald',
  'colosseum',
  'xd',
  'diamond',
  'pearl',
  'platinum',
  'heartgold',
  'soulsilver',
  'black',
  'white',
  'black2',
  'white2',
  'dreamworld',
  'dreamradar',
  'x',
  'y',
  'omegaruby',
  'alphasapphire',
  'sun',
  'moon',
  'ultrasun',
  'ultramoon',
  'letsgopikachu',
  'letsgoeevee',
];

const PokemonEntry = ({ pokemon, pokeballs }) => (
  <tr className="pokemon-entry" id={'pokemon-' + pokemon.dexNumber}>
    <td>
      <span>
        #{pokemon.dexNumber} {pokemon.species}
      </span>
    </td>
      { pokeballs.map( ( pokeball ) => {

        var count = 0;
        for ( var gameIndex in gameOrder ) {

          let game = gameOrder[ gameIndex ];

          if ( typeof pokemon[ game ] !== 'undefined' && 
            typeof pokemon[ game ].pokeballs !== 'undefined' && 
            pokemon[ game ].pokeballs.indexOf( pokeball ) >= 0 ) {
              count++;
          }

        }

        return <td className={pokeball + ' pokeball-available'} key={pokemon.dexNumber + '-' + pokeball}>{ ( count > 0 ) ? 1 : 0 }</td>

      } ) }
  </tr>
);

PokemonEntry.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default PokemonEntry;