import React, { Component } from "react";
import ReactDOM from "react-dom";

import PokemonFilter from '../presentational/PokemonFilter.jsx';
import PokeballFilter from '../presentational/PokeballFilter.jsx';
import PokemonEntry from "../presentational/PokemonEntry.jsx";
import PokemonGameData from "../presentational/PokemonGameData.jsx";
import Modal from "react-foundation-modal";

import pokemonData from '../../pokeball-availability.json';
import breedingExclusionsData from '../../cannot-breed-hidden-ability-to-new-pokeball.json';

var breedingExclusions = breedingExclusionsData.map( ( pokemon ) => {
  return pokemon.dexNumber;
} );

import { type } from "os";

const pokeballs = {
  'pokeball': 'Poké Ball',
  'greatball': 'Great Ball',
  'ultraball': 'Ultra Ball',
  'masterball': 'Master Ball',
  'premierball': 'Premier Ball',
  'repeatball': 'Repeat Ball',
  'timerball': 'Timer Ball',
  'nestball': 'Nest Ball',
  'netball': 'Net Ball',
  'diveball': 'Dive Ball',
  'luxuryball': 'Luxury Ball',
  'healball': 'Heal Ball',
  'quickball': 'Quick Ball',
  'duskball': 'Dusk Ball',
  'levelball': 'Level Ball',
  'lureball': 'Lure Ball',
  'moonball': 'Moon Ball',
  'friendball': 'Friend Ball',
  'loveball': 'Love Ball',
  'heavyball': 'Heavy Ball',
  'fastball': 'Fast Ball',
	'safariball': 'Safari Ball',
	'sportball': 'Sport Ball',
	'dreamball': 'Dream Ball',
	'beastball': 'Beast Ball',
};

const gameOrder = {
  'ruby': 'Ruby',
	'sapphire': 'Sapphire',
	'firered': 'FireRed',
	'leafgreen': 'LeafGreen',
	'emerald': 'Emerald',
	'colosseum': 'Colosseum',
	'xd': 'XD: Gale of Darkness',
	'diamond': 'Diamond',
	'pearl': 'Pearl',
	'platinum': 'Platinum',
	'heartgold': 'HeartGold',
	'soulsilver': 'SoulSilver',
	'black': 'Black',
	'white': 'White',
	'black2': 'Black 2',
	'white2': 'White 2',
	'dreamworld': 'Dream World',
	'dreamradar': 'Dream Radar',
	'x': 'X',
	'y': 'Y',
	'omegaruby': 'Omega Ruby',
	'alphasapphire': 'Alpha Sapphire',
	'sun': 'Sun',
	'moon': 'Moon',
	'ultrasun': 'Ultra Sun',
	'ultramoon': 'Ultra Moon',
	'letsgopikachu': "Let's Go, Pikachu!",
	'letsgoeevee': "Let's Go, Eevee!",
};
class PokemonList extends Component {
  constructor() {
    super();

    this.state = {
      selectedPokeballs: [],
      search: '',
      modalIsOpen: false,
      viewedPokemon: 0,
    };

    this.handleArrayChange = this.handleArrayChange.bind( this );

    this.handleStringChange = this.handleStringChange.bind( this );

    this.showModal = this.showModal.bind( this );

    this.updateViewedPokemon = this.updateViewedPokemon.bind( this );

  }

  handleArrayChange( event ) {
    
    const options = this.state[ event.target.getAttribute( 'name' ) ];
    let index;

    // check if the check box is checked or unchecked
    if ( event.target.checked ) {
      options.push( event.target.value );
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf( event.target.value );
      options.splice( index, 1 );
    }

    // update the state with the new array of options
    this.setState( { [ event.target.getAttribute( 'name' ) ]: options } );

  }

  handleStringChange( event ) {

    this.setState( { [ event.target.getAttribute( 'name' ) ]: event.target.value } );

  }

  showModal( state ) {

    this.setState( { ['modalIsOpen']: state } );

  }

  updateViewedPokemon( event ) {

    event.preventDefault();

    this.setState( { ['viewedPokemon']: event.target.getAttribute( 'href' ) } );

    this.showModal( true );

  }

  render() {

    const { selectedPokeballs, search, viewedPokemon } = this.state;

    var filteredPokemonData = pokemonData.filter(
      ( tree ) => {

        let foundName = tree.find( ( pokemon ) => {
          return pokemon.species.toLowerCase().indexOf( search.toLowerCase() ) >= 0;
        } );

        let foundDexNumber = tree.find( ( pokemon ) => {
          return pokemon.dexNumber.toString().indexOf( search ) >= 0;
        } );

        return ( foundName || foundDexNumber );

      }
    );
    
    filteredPokemonData = filteredPokemonData.filter(
      ( tree ) => {

        if ( selectedPokeballs.length == 0 ) {
          return true;
        }
        else {

          var found = [];

          for ( var pokemonIndex in tree ) {

            var pokemon = tree[ pokemonIndex ];

            for ( var gameIndex in pokemon ) {

              let game = pokemon[ gameIndex ];
              
              if ( typeof pokemon[ gameIndex ] !== 'undefined' && 
                pokemon[ gameIndex ] !== false && 
                typeof pokemon[ gameIndex ].pokeballs !== 'undefined' ) {

                  let matches = pokemon[ gameIndex ].pokeballs.filter( value => selectedPokeballs.includes( value ) );

                  if ( matches.length > 0 ) {
                    found = found.concat( matches.filter(
                      item => found.indexOf( item ) < 0
                    ) );
                  }

                  if ( found.length == selectedPokeballs.length ) {
                    break;
                  }

              }

            }

          }

          if ( found.length == selectedPokeballs.length ) {
            return true;
          }

        }

        return false;

      }
    );

    var defaultEvolutionTree = [
        {
          dexNumber: 0,
          species: 'MissingNo.',
        }
    ];

    var evolutionTree = pokemonData.find( ( tree, index ) => {

      let found = tree.find( ( pokemon ) => {
        return pokemon.dexNumber.toString() == viewedPokemon;
      } );

      if ( found ) return tree;

      return false;

    } );

    if ( typeof evolutionTree == 'undefined' ) {
      evolutionTree = defaultEvolutionTree;
    }

    return (

      <div id="pokemon-list">
        <PokemonFilter search={search} onChange={this.handleStringChange} />
        <label>Click the Poké Balls in the table header to filter by specific Poké Balls.</label>
        <table>
          <thead>
              <tr>
                <th>&nbsp;</th>
                { Object.keys( pokeballs ).map( ( pokeball ) => {

                  let className = ( selectedPokeballs.indexOf( pokeball ) >= 0 ) ? 'selected' : '';

                  return <th className={className} key={pokeball + '-filter'}><PokeballFilter pokeballs={pokeballs} pokeball={pokeball} onChange={this.handleArrayChange} /></th>
                } ) }
              </tr>
          </thead>
          <tbody>
              { filteredPokemonData.map( ( tree, index ) => {

                let hiddenAbilityPokeballs = [];

                for ( let treeIndex in tree ) {

                  let pokemon = tree[ treeIndex ];

                  let perPokemonHiddenAbilityPokeballs = Object.keys( pokeballs ).filter( ( pokeball ) => {

                    let hiddenAbility = false;

                    for ( var game in gameOrder ) {

                      if ( typeof pokemon[ game ] !== 'undefined' && 
                        pokemon[ game ] !== false && 
                        typeof pokemon[ game ].pokeballs !== 'undefined' && 
                        typeof pokemon[ game ].pokeballs[ pokeball ] !== 'undefined' && 
                        typeof pokemon[ game ].pokeballs[ pokeball ].hiddenAbility !== 'undefined' ) {
                          hiddenAbility = true;
                          break;
                      }

                    }
                    
                    return hiddenAbility;

                  } );

                  hiddenAbilityPokeballs = hiddenAbilityPokeballs.concat( perPokemonHiddenAbilityPokeballs );

                }

                return <PokemonEntry tree={tree} key={'main-view-index-' + index} pokeballs={pokeballs} onClick={this.updateViewedPokemon} gameOrder={gameOrder} hiddenAbilityPokeballs={hiddenAbilityPokeballs} breedingExclusions={breedingExclusions} />

              } ) }
          </tbody>
        </table>
        <Modal 
          open={this.state.modalIsOpen}
          closeModal={this.showModal}
          isModal={true}
          size="large"
          overlayStyle={ {
            'backgroundColor': 'rgba(33,10,10,.45)',
          } }>
          <PokemonGameData tree={evolutionTree} pokeballs={pokeballs} gameOrder={gameOrder} />
          <button className="button" type="button" onClick={() => this.showModal(false)}>
              Close
          </button>
        </Modal>
      </div>
    );
  }
}

const wrapper = document.getElementById( "pokeball-availability-form" );
wrapper ? ReactDOM.render(<PokemonList />, wrapper) : false;

export default PokemonList;