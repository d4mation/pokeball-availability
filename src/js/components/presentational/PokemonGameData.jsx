import React from "react";
import PropTypes from "prop-types";
import ToolTip from "react-tooltip";
import ReactHtmlParser from 'react-html-parser';

const noHiddenAbilityGames = [
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
    'letsgopikachu',
    'letsgoeevee',
    'sword',
    'shield',
];

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
                        { Object.keys( pokeballs ).map( ( pokeball ) => {
                            return <th key={'pokemon-game-data-pokeball-' + pokeball}><img src={'dist/images/' + pokeball + '.png' } alt={pokeballs[ pokeball ]} title={pokeballs[ pokeball ]} /></th>
                        } ) }
                    </tr>
                </thead>
                <tbody>
                    { Object.keys( gameOrder ).map( ( gameIndex ) => {

                        return <tr className="pokemon-game-data" id={gameIndex + '-' + pokemon.dexNumber} key={gameIndex + '-' + pokemon.dexNumber}>

                            <td>{gameOrder[ gameIndex ]}</td>

                            { Object.keys( pokeballs ).map( ( pokeball ) => {

                                var catchable = false;

                                var notes = [];

                                if ( typeof pokemon[ gameIndex ] !== 'undefined' && 
                                typeof pokemon[ gameIndex ].pokeballs !== 'undefined' && 
                                typeof pokemon[ gameIndex ].pokeballs[ pokeball ] !== 'undefined' ) {

                                    catchable = true;

                                    // This is currently only true in the case of the Heavy Ball bug in Sun/Moon
                                    if ( typeof pokemon[ gameIndex ].pokeballs[ pokeball ].notes !== 'undefined' ) {

                                        catchable = false;

                                        notes = notes.concat( pokemon[ gameIndex ].pokeballs[ pokeball ].notes );                          

                                    }

                                }

                                if ( catchable ) {

                                    if ( noHiddenAbilityGames.indexOf( gameIndex ) < 0 && 
                                        typeof pokemon[ gameIndex ].pokeballs[ pokeball ].hiddenAbility == 'undefined' ) {

                                        notes.push( 'Cannot be captured with Hidden Ability in this Poké Ball' );
                                        
                                    }
                                    else if ( noHiddenAbilityGames.indexOf( gameIndex ) < 0 && 
                                        typeof pokemon[ gameIndex ].pokeballs[ pokeball ].hiddenAbility !== 'undefined' && 
                                        typeof pokemon[ gameIndex ].pokeballs[ pokeball ].hiddenAbility.notes !== 'undefined' ) {

                                        notes = notes.concat( pokemon[ gameIndex ].pokeballs[ pokeball ].hiddenAbility.notes );

                                    }

                                }

                                if ( typeof pokemon[ gameIndex ] !== 'undefined' && 
                                typeof pokemon[ gameIndex ].notes !== 'undefined' ) {
                                    notes = notes.concat( pokemon[ gameIndex ].notes );
                                }

                                notes = notes.join( '<br />' );

                                return <td key={gameIndex + '-' + pokemon.dexNumber + '-' + pokeball}>

                                    { ( notes.length > 0 ) ? ( ( catchable ) ? <span data-tip data-for={gameIndex + '-' + pokemon.dexNumber  + '-' + pokeball + '-notes'} className="fas fa-check"></span> : <span data-tip data-for={gameIndex + '-' + pokemon.dexNumber  + '-' + pokeball + '-notes'} className="fas fa-times"></span> ) : ( catchable ) ? <span className="fas fa-check"></span> : <span className="fas fa-times"></span> }

                                    { ( notes.length > 0 ) ? <ToolTip multiline={true} id={gameIndex + '-' + pokemon.dexNumber  + '-' + pokeball + '-notes'}><span>{ ReactHtmlParser( notes ) }</span></ToolTip> : '' }
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
  pokeballs: PropTypes.object.isRequired,
  gameOrder: PropTypes.object.isRequired,
};

export default PokemonGameData;