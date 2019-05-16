import React, { Component } from "react";
import ReactDOM from "react-dom";

import PokemonFilter from '../presentational/PokemonFilter.jsx';
import PokeballFilter from '../presentational/PokeballFilter.jsx';
import PokemonEntry from "../presentational/PokemonEntry.jsx";
import PokemonGameData from "../presentational/PokemonGameData.jsx";
import Modal from "react-foundation-modal";

import pokemonData from '../../pokeball-availability.json';
import { type } from "os";

const pokeballs = [
  'pokeball',
  'greatball',
  'ultraball',
  'masterball',
  'premierball',
  'repeatball',
  'timerball',
  'nestball',
  'netball',
  'diveball',
  'luxuryball',
  'healball',
  'quickball',
  'duskball',
  'levelball',
  'lureball',
  'moonball',
  'friendball',
  'loveball',
  'heavyball',
  'fastball',
	'safariball',
	'sportball',
	'dreamball',
	'beastball',
];

class PokemonList extends Component {
  constructor() {
    super();

    this.state = {
      pokeball: [],
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

    const { pokeball, search, viewedPokemon } = this.state;

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

        if ( pokeball.length == 0 ) {
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

                  let matches = pokemon[ gameIndex ].pokeballs.filter( value => pokeball.includes( value ) );

                  if ( matches.length > 0 ) {
                    found = found.concat( matches.filter(
                      item => found.indexOf( item ) < 0
                    ) );
                  }

                  if ( found.length == pokeball.length ) {
                    break;
                  }

              }

            }

          }

          if ( found.length == pokeball.length ) {
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
        <fieldset class="fieldset">
          { pokeballs.map( ( pokeball ) => {
            return <PokeballFilter pokeball={pokeball} key={pokeball + '-filter'} onChange={this.handleArrayChange} />
          } ) }
        </fieldset>
        <PokemonFilter search={search} onChange={this.handleStringChange} />
        <table>
          <thead>
              <tr>
                <th>&nbsp;</th>
                { pokeballs.map( ( pokeball ) => {
                  return <th key={'main-view-pokeball-' + pokeball}><img src={'/dist/images/' + pokeball + '.png' } alt={pokeball}/></th>
                } ) }
              </tr>
          </thead>
          <tbody>
              { filteredPokemonData.map( ( tree, index ) => {
                return <PokemonEntry tree={tree} key={'main-view-index-' + index} pokeballs={pokeballs} onClick={this.updateViewedPokemon} />
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
          <PokemonGameData tree={evolutionTree} pokeballs={pokeballs} />
          <button className="button" type="button" onClick={() => this.showModal(false)}>
              Close
          </button>
        </Modal>
      </div>
    );
  }
}

const wrapper = document.getElementById( "create-article-form" );
wrapper ? ReactDOM.render(<PokemonList />, wrapper) : false;

export default PokemonList;