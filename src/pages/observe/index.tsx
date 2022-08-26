import { useLinkToRandomCode } from '@/libs';

const Observe = () => {
  const linkToRandomCode = useLinkToRandomCode();
  linkToRandomCode();
  return null;
};

export default Observe;
