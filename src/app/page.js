"use client"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '@/components/MovieCard';
import Loader from '@/components/Loader';
import SearchComponent from '@/components/SearchComponent';
import SelectedMovies from '@/components/SelectedMovies';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import cam from '../images/cam.jpg'

const queryClient = new QueryClient();

export function Home() {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('Movies');
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('selectedMovies'));
    if (items) {
      setSelected(items)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('selectedMovies', JSON.stringify(selected))
    setCount(selected.length)
  }, [selected])

  const fetchingMovies = async (search) => {
    let url;
    if (searchType === 'Series') {
      url = `https://www.omdbapi.com/?s=${search}&type=series&apikey=ab12d609`;
    } else if (searchType === 'Movies') {
      url = `https://www.omdbapi.com/?s=${search}&type=movie&apikey=ab12d609`;
    }
    const res = await axios.get(url);
    return res.data;
  };

  const { isLoading, error, data } = useQuery(
    ['movies', search],
    () => fetchingMovies(search)
  );

  const handleSearch = debounce((e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  }, 1000)

  return (
    <main className='flex flex-wrap w-full flex-col md:flex-row ' >
      <div className='bg-[#FAF7ED] md:w-1/2 '>
        <div className='flex flex-col space-y-5  px-10 py-5 pb-12 '>
          <div className='logo mb-6 flex items-center space-x-2'>
            <Image
              src={cam}
              width={50}
              height={50}
              alt="Picture of the author"
              className='text-purple-700'
            />
            <h1 className='text-3xl italic text-slate-700 font-bold'> Shopfinity </h1>
          </div>
          <div className=' space-y-10'>
            <h1 className='brand text-6xl font-semibold space-y-5 '>
              <span className='text-[#906509]'>Nominate — </span>
              <span className='text-purple-900'>where cinema shines.</span>
            </h1>
            <h3 className='brand-text text-[#42474D] text-xl'> Explore and nominate your top 5 favorite movies & series below. </h3>

            <SearchComponent searchType={searchType} setSearchType={setSearchType} setSearch={setSearch} onChange={handleSearch} search={search} />
          </div>
          {search && <div className='text-sm text-purple-700 py-2'>Movie results for: &quot;{search}&quot;  </div>}
          {isLoading && <Loader />}
          {error && <div>Error: {error.message}</div>}
          <div className='flex flex-col gap-2'>
            {data?.Search?.length > 0 && search ? (
              data.Search.slice(0, 3).map((movie) => (
                <MovieCard
                  selected={selected}
                  setSelected={setSelected}
                  movie={movie}
                  key={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  type={movie.Type}
                  setCount={setCount}
                />
              ))
            ) : (
              search !== '' && !isLoading && (
                <div className='w-full flex flex-col text-center py-1 bg-[#F5E0DB] text-red-700 font-bold rounded-sm'>
                  No {searchType[0].toLocaleLowerCase() + searchType.slice(1,searchType.length)} found.
                  <span className='font-light'>Please review your search. </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className={`relative flex flex-col items-center  space-y-10 bg-purple-700 py-10 ${selected.length > 3 ? 'h-[1100px]' : 'h-[700px]'} md:h-auto flex-wrap md:w-1/2`}>
        <h1 className='absolute nominated top-5 right-10 text-xl  text-center text-[#FAF7ED]'>Nominated <span className='text-2xl nominated-count'>{count}/5</span></h1>
        {selected.map(movie => (
          <SelectedMovies
            movie={movie}
            selected={selected}
            setSelected={setSelected}
            key={movie.imdbID}
            poster={movie.Poster}
            title={movie.Title}
            year={movie.Year}
            type={movie.Type}
          />
        ))}
      </div>
    </main>
  );
}

function HomeWithProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default HomeWithProvider;