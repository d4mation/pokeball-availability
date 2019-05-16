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

const PokemonEntry = ({ tree, pokeballs, onClick }) => (

  <tr className="pokemon-entry" id={'pokemon-' + tree[0].dexNumber}>
    <td>
      <a onClick={onClick} href={tree[0].dexNumber}>
        #{tree[0].dexNumber} {tree[0].species}
      </a>
    </td>
      { pokeballs.map( ( pokeball ) => {

        var available = false;

        for ( var pokemonIndex in tree ) {

          var pokemon = tree[ pokemonIndex ];
        
          for ( var gameIndex in gameOrder ) {

            let game = gameOrder[ gameIndex ];

            if ( typeof pokemon[ game ] !== 'undefined' && 
              typeof pokemon[ game ].pokeballs !== 'undefined' && 
              pokemon[ game ].pokeballs.indexOf( pokeball ) >= 0 ) {
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
};

export default PokemonEntry;