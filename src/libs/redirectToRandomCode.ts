import { useRouter } from 'next/router';
import {
  adjectives,
  animals,
  Config,
  NumberDictionary,
  uniqueNamesGenerator,
} from 'unique-names-generator';

export const redirectToRandomCode = () => {
  const router = useRouter();

  const linkToRandomCode = () => {
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
    router.replace(`/observe/${code}`);
  };

  return linkToRandomCode;
};
