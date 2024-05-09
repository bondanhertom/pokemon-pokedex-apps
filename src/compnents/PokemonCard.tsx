import {useQuery} from '@tanstack/react-query';
import {fetchFn, Pokemon} from '../utils/api';
import {ActivityIndicator} from 'react-native';

import {
  Box,
  Text,
  Image,
  View,
  Heading,
  HStack,
  Pressable,
  Center,
  Stack,
  AspectRatio,
  Skeleton,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {MainStackScreenProps} from '../navigator/type';
import {getTypeColor, formatNumber} from '../utils/helper';

interface PokemonCardProps {
  url: string;
  name: string;
}

export default function PokemonCard({url, name}: PokemonCardProps) {
  const {isLoading, error, data} = useQuery<Pokemon>({
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
  const navigation =
    useNavigation<MainStackScreenProps<'Home'>['navigation']>();

  if (isLoading) {
    return (
      <Stack flex={1} m="1.5" p="4" space={2} borderRadius={10}>
        <Skeleton h="32" />
        <Skeleton.Text px="4" />
      </Stack>
    );
  }

  if (error || !data) return <ActivityIndicator />;

  return (
    <Pressable
      flex={1}
      m="1.5"
      p="4"
      backgroundColor={getTypeColor(data.types[0].type.name) + '.500'}
      borderRadius={10}
      onPress={() => navigation.navigate('Detail', {name, url})}>
      <Center>
        <AspectRatio ratio={1} width="80%">
          <Image
            source={{
              uri: data.sprites.other['official-artwork'].front_default,
            }}
            alt="image"
          />
        </AspectRatio>
      </Center>

      <HStack justifyContent="space-between" mb={2}>
        <Heading color="white" textTransform="capitalize">
          {data.name}
        </Heading>
        <Text color="white">#{formatNumber(data.id)}</Text>
      </HStack>
      <HStack>
        {Array.isArray(data.types) &&
          data.types.map(type => (
            <Box
              key={type.type.name}
              px="2"
              mr="1"
              backgroundColor={getTypeColor(type.type.name) + '.400'}
              borderRadius={10}>
              {type.type.name}
            </Box>
          ))}
      </HStack>
    </Pressable>
  );
}
