import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  Detail: {name: string; url: string};
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;
