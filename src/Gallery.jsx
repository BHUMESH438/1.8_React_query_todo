import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGlobalContext } from './GlobalContext';
const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`;
const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    }
  });
  if (response.isLoading) {
    return (
      <section className='image-container'>
        <h4>Loading......</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className='image-container'>
        <h4> Error.......</h4>
      </section>
    );
  }
  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className='image-container'>
        <h4> Error.......</h4>
      </section>
    );
  }
  console.log('>>>>>>>>>>', response);
  return (
    <section className='image-container'>
      {results.map(items => {
        const url = items?.urls?.regular;
        return <img src={url} alt={items.alt_description} key={items.id} className='img' />;
      })}
    </section>
  );
};
export default Gallery;