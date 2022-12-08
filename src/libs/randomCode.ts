import {
  adjectives,
  animals,
  Config,
  NumberDictionary,
  uniqueNamesGenerator,
} from 'unique-names-generator';

export const randomCode = () => {
  const numberDictionary = NumberDictionary.generate({
    min: 100,
    max: 999,
  });

  const uniqueNamesConfig: Config = {
    dictionaries: [adjectives, animals, numberDictionary],
    separator: '-',
    length: 3,
  };

  const code: string = uniqueNamesGenerator(uniqueNamesConfig);
  return `/observe/${code}`;
};
