/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {FlatList, Spinner, Center} from 'native-base';
import PokemonCard from '../compnents/PokemonCard';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getAllPokemon, PokemonResult} from '../utils/api';

function Home() {
  const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} =
    useInfiniteQuery<PokemonResult>(['pokemons'], getAllPokemon, {
      getNextPageParam: lastPage => lastPage.next,
    });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading)
    return (
      <Center flex={1}>
        <Spinner size="lg" color="black" />
      </Center>
    );

  if (!data) return null;

  return (
    <FlatList
      data={data.pages.flatMap(page => page.results)}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({item}) => <PokemonCard url={item.url} name={item.name} />}
      onEndReached={loadMore}
      numColumns={2}
      contentInsetAdjustmentBehavior="automatic"
      ListFooterComponent={() =>
        isFetchingNextPage ? <Spinner mt="4" size="lg" color="black" /> : null
      }
      _contentContainerStyle={{p: 1, color: 'white'}}
    />
  );
}

export default Home;
