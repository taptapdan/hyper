import { randomCode } from '@/libs';

const Observe = () => {
  return null;
};

export default Observe;

export async function getServerSideProps() {
  const destination = randomCode();

  return {
    redirect: {
      destination,
    },
  };
}
