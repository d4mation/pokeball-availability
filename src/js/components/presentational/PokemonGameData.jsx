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

const PokemonGameData = ({ tree, pokeballs }) => (

    <div className="outer-container" key={'pokemon-game-data-outer-container-' + tree[0].dexNumber}>

        { tree.map( ( pokemon ) => {

            return <div className="inner-container" key={'pokemon-game-data-inner-container-' + pokemon.dexNumber}>
                <h1>
                    <a href={'https://bulbapedia.bulbagarden.net/wiki/' + encodeURIComponent( pokemon.species ) + '_(Pokémon)#Game_locations'} target="_blank">
                        #{pokemon.dexNumber} {pokemon.species}
                    </a>
                </h1>

            <table>
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        { pokeballs.map( ( pokeball ) => {
                            return <th key={'pokemon-game-data-pokeball-' + pokeball}><img src={'/dist/images/' + pokeball + '.png' } alt={pokeball} /></th>
                        } ) }
                    </tr>
                </thead>
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

                                    { ( notes ) ? ( ( catchable ) ? <span data-tip data-for={game + '-' + pokemon.dexNumber + '-notes'} className="fas fa-check"></span> : <span className="fas fa-times"></span> ) : ( catchable ) ? <span className="fas fa-check"></span> : <span className="fas fa-times"></span> }

                                    { ( notes ) ? <ToolTip id={game + '-' + pokemon.dexNumber + '-notes'}><span>{pokemon[game].notes}</span></ToolTip> : '' }
                                </td>

                            } ) }

                        </tr>

                    } ) }
                </tbody>
            </table></div>

        } ) }

    </div>
);

PokemonGameData.propTypes = {
  tree: PropTypes.array.isRequired,
};

export default PokemonGameData;