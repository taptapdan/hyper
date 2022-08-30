import { useRedirectToRandomCode } from '@/libs';
import { useEffectOnce } from '@/libs/useEffectOnce';

const Observe = () => {
  const linkToRandomCode = useRedirectToRandomCode();

  useEffectOnce(() => {
    linkToRandomCode();
  });

  return null;
};

export default Observe;
