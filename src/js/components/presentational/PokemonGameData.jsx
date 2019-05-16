import React from "react";
import PropTypes from "prop-types";
import ToolTip from "react-tooltip";

const PokemonGameData = ({ tree, pokeballs, gameOrder }) => (

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
                    { Object.keys( gameOrder ).map( ( gameIndex ) => {

                        return <tr className="pokemon-game-data" id={gameIndex + '-' + pokemon.dexNumber} key={gameIndex + '-' + pokemon.dexNumber}>

                            <td>{gameOrder[ gameIndex ]}</td>

                            { pokeballs.map( ( pokeball ) => {

                                var catchable = false;

                                if ( typeof pokemon[ gameIndex ] !== 'undefined' && 
                                typeof pokemon[ gameIndex ].pokeballs !== 'undefined' && 
                                pokemon[ gameIndex ].pokeballs.indexOf( pokeball ) >= 0 ) {
                                    catchable = true;
                                }

                                var notes = false

                                if ( typeof pokemon[ gameIndex ] !== 'undefined' && 
                                typeof pokemon[ gameIndex ].notes !== 'undefined' ) {
                                    notes = pokemon[ gameIndex ].notes;
                                }

                                return <td key={gameIndex + '-' + pokemon.dexNumber + '-' + pokeball}>

                                    { ( notes ) ? ( ( catchable ) ? <span data-tip data-for={gameIndex + '-' + pokemon.dexNumber + '-notes'} className="fas fa-check"></span> : <span className="fas fa-times"></span> ) : ( catchable ) ? <span className="fas fa-check"></span> : <span className="fas fa-times"></span> }

                                    { ( notes ) ? <ToolTip id={gameIndex + '-' + pokemon.dexNumber + '-notes'}><span>{pokemon[gameIndex].notes}</span></ToolTip> : '' }
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