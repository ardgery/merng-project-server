module.exports = {
    Query: {
        listpokemonQuery: () => {
            return axios
            .get('https://pokeapi.co/api/v2/pokemon')
            .then(res => {
              return res.data.results;
            })
        },
        pokemonQuery: (parent, args, context, info) =>{
          return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${args.id}`)
          .then(res => {
            return({
              id: res.data.id,
              name: res.data.forms[0].name,
              moves: res.data.moves.map(item=>item.move),
              types: res.data.types.map(item=>item.type)
            });
          });
        },
    },
}