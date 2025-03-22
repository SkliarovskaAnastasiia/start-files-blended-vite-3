import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCountry } from '../service/countryApi';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import Loader from '../components/Loader/Loader';

const Country = () => {
  const { countryId } = useParams();

  const [countryInfo, setCoutryInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await fetchCountry(countryId);
        setCoutryInfo(res);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [countryId]);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <b>Something went wrong...</b>}
        {countryInfo && <CountryInfo countryInfo={countryInfo} />}
      </Container>
    </Section>
  );
};

export default Country;
