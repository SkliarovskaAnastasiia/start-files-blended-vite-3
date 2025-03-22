import { useEffect, useState } from 'react';
import { getCountries } from '../service/countryApi';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';

const Home = () => {
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await getCountries();
        setCountries(res);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <b>Something went wrong...</b>}
        {countries && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
export default Home;
