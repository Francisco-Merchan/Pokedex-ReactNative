import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {styles} from '../theme/appTheme';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;
export const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const {top} = useSafeAreaInsets();
  const {fetching, simplePokemonList} = usePokemonSearch();

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (fetching) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: top + 30,
        }}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={pokemonFiltered}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          //Header
          ListHeaderComponent={() => (
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                paddingBottom: 10,
                marginTop: top + 80,
              }}>
              {term}
            </Text>
          )}
          renderItem={({item, index}) => <PokemonCard pokemon={item} />}
        />
      </View>
    </View>
  );
};
