import React from "react";
import PropTypes from "prop-types";
import ToolTip from "react-tooltip";

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

const PokemonGameData = ({ pokemon, pokeballs }) => (
    <table>
        <tbody>
            { gameOrder.map( ( game ) => {

                return <tr className="pokemon-game-data" id={game + '-' + pokemon.dexNumber} key={game + '-' + pokemon.dexNumber}>

                    <td>{game}</td>

                    { pokeballs.map( ( pokeball ) => {

                        var catchable = false;

                        if ( typeof pokemon[ game ] !== 'undefined' && 
                        typeof pokemon[ game ].pokeballs !== 'undefined' && 
                        pokemon[ game ].pokeballs.indexOf( pokeball ) >= 0 ) {
                            catchable = true;
                        }

                        var notes = false

                        if ( typeof pokemon[ game ] !== 'undefined' && 
                        typeof pokemon[ game ].notes !== 'undefined' ) {
                            notes = pokemon[ game ].notes;
                        }

                        return <td key={game + '-' + pokemon.dexNumber + '-' + pokeball}>

                            { ( notes ) ? <span data-tip data-for={game + '-' + pokemon.dexNumber + '-notes'}>{ ( catchable ) ? 1 + '*' : 0 }</span> : ( catchable ) ? 1 : 0 }

                            { ( notes ) ? <ToolTip id={game + '-' + pokemon.dexNumber + '-notes'}><span>{pokemon[game].notes}</span></ToolTip> : '' }
                            
                        </td>

                    } ) }

                </tr>

            } ) }
        </tbody>
    </table>
);

PokemonGameData.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default PokemonGameData;