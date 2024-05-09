import {MainStackScreenProps} from '../navigator/type';
import {useQuery} from '@tanstack/react-query';
import {fetchFn, Pokemon, Species} from '../utils/api';
import {
  AspectRatio,
  Text,
  Image,
  Heading,
  Stack,
  HStack,
  Center,
  Skeleton,
} from 'native-base';
import {
  formatNumber,
  getTypeColor,
  removeEscapeCharacters,
} from '../utils/helper';

export default function Detail({route}: MainStackScreenProps<'Detail'>) {
  const {name, url} = route.params;
  const {data} = useQuery<Pokemon>({
    queryKey: ['pokemon', name],
    queryFn: async () => {
      try {
        const response = await fetchFn(url);
        return response?.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  const {isLoading: isSpeciesLoading, data: species} = useQuery<Species>({
    queryKey: ['species', name],
    queryFn: async () => {
      try {
        const pokemonResponse = await fetchFn(url);
        const speciesUrl = pokemonResponse?.data?.species?.url;

        if (!speciesUrl) {
          throw new Error('Species URL not found in pokemon data.');
        }
        const speciesResponse = await fetchFn(speciesUrl);
        return speciesResponse?.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  if (!data) return null;

  return (
    <Stack>
      <Center
        safeArea
        backgroundColor={getTypeColor(data.types[0].type.name) + '.500'}>
        <AspectRatio ratio={1} width="80%">
          <Image
            source={{
              uri: data.sprites.other['official-artwork'].front_default,
            }}
            alt="image"
          />
        </AspectRatio>

        <HStack
          justifyContent="space-between"
          width="100%"
          p="3"
          alignItems="center"
          position="absolute"
          bottom={0}
          left={0}
          right={0}>
          <Heading color="white" textTransform="capitalize" size="2xl">
            {name}
          </Heading>
          <Heading color="white">#{formatNumber(data.id)}</Heading>
        </HStack>
      </Center>

      <Stack p="3">
        <HStack justifyContent="center">
          {data.types.map(type => (
            <Center
              key={type.type.name}
              p="1"
              rounded="full"
              minW="32"
              backgroundColor={getTypeColor(type.type.name) + '.500'}
              _text={{
                color: 'white',
                fontSize: 'lg',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
              mx="2">
              {type.type.name}
            </Center>
          ))}
        </HStack>
        <Center>
          {isSpeciesLoading && <Skeleton.Text />}
          {!!species && (
            <Text fontSize="xl" mt="4">
              {removeEscapeCharacters(
                species.flavor_text_entries[0].flavor_text,
              )}
            </Text>
          )}
        </Center>
      </Stack>
    </Stack>
  );
}
