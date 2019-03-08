import React from 'react';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokemonRow(props){
 var is_first = props.number === 1
 return(
    <div className="card">
      <div className="card-header" id="headingOne">
        <h5 className="mb-0">
          <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse"+props.number} aria-expanded={is_first} aria-controls={"collapse"+props.number}>
            {props.name}
          </button>
        </h5>
      </div>

      <div id={"collapse"+props.number} className="collapse hide" aria-labelledby={"heading"+props.number} data-parent="#accordionExample">
        <div className="card-body">
          <PokemonInfo url={props.url} />
        </div>
      </div>
    </div>
  )
}

class PokemonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemon_info: []
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            pokemon_info: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, pokemon_info } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
            <img src={pokemon_info.sprites.front_default} alt={pokemon_info.name}/>
      );
    }
  }
}

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemon_list: []
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            pokemon_list: result.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, pokemon_list } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          pokemon_list.map((pokemon, pokemon_no) => (
            <PokemonRow name={capitalizeFirstLetter(pokemon.name)} url={pokemon.url} key={pokemon_no+1} number={pokemon_no+1} />
          ))
      );
    }
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="accordion" id="accordionExample">
            <Pokedex url='https://pokeapi.co/api/v2/pokemon/?limit=9'/>
        </div>
      </div>
    );
  }
}

export default App;
