import { useEffect, useState } from 'react';
import { fetchByRegion } from '../service/countryApi';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import SearchForm from '../components/SearchForm/SearchForm';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';

const SearchCountry = () => {
  const [searchedParams, setSearchedParams] = useSearchParams();
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const region = searchedParams.get('region');

  const handleSubmit = searchedRegion => {
    setSearchedParams({ region: searchedRegion });
  };

  useEffect(() => {
    if (!region) return;

    (async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await fetchByRegion(region);
        setCountries(res);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [region]);

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />

        {isLoading && <Loader />}
        {error && <b>Something went wrong...</b>}
        {countries && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
