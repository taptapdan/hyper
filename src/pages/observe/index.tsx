import { redirectToRandomCode } from '@/libs';
import { useEffectOnce } from '@/libs/useEffectOnce';

const Observe = () => {
  const linkToRandomCode = redirectToRandomCode();

  useEffectOnce(() => {
    linkToRandomCode();
  });

  return null;
};

export default Observe;
