import React, { Component } from "react";
import ReactDOM from "react-dom";

import PokeballFilter from '../presentational/PokeballFilter.jsx';
import PokemonEntry from "../presentational/PokemonEntry.jsx";

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
      pokeball: []
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange( event ) {
    
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

  render() {

    const { pokeball } = this.state;

    var filteredPokemonData = pokemonData.filter(
      ( pokemon ) => {

        if ( pokeball.length == 0 ) {
          return true;
        }
        else {

          var found = [];
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

          if ( found.length == pokeball.length ) {
            return true;
          }

        }

        return false;

      }
    );

    return (

      <div id="pokemon-list">
        { pokeballs.map( ( pokeball ) => {
          return <PokeballFilter pokeball={pokeball} key={pokeball + '-filter'} onChange={this.handleChange} />
        } ) }
        <table>
          <tbody>
            { filteredPokemonData.map( ( pokemon ) => {
              return <PokemonEntry pokemon={pokemon} key={pokemon.dexNumber} pokeballs={pokeballs} />
            } ) }
          </tbody>
        </table>
      </div>
    );
  }
}

const wrapper = document.getElementById( "create-article-form" );
wrapper ? ReactDOM.render(<PokemonList />, wrapper) : false;

export default PokemonList;