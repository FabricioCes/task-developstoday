'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import Loading from './shared/Loading';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchMakes = async () => {
      setLoading(true);
      const response = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
      const data = await response.json();
      setMakes(data.Results);
      setLoading(false);
    };

    fetchMakes();
  }, []);

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMakeId(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };


  return (
    <section className="container mx-auto p-4">
      <form className="max-w-sm mx-auto space-y-6">
        {/* Select Make */}
        <div>
          <Suspense fallback={<Loading />}>
            {loading ? (
              <Loading />
            ) : (
              <>
              <label htmlFor="make" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Make</label>
              <select
                id="make"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedMakeId}
                onChange={handleMakeChange}
              >
                <option value="">Choose a Make</option>
                {makes.map((make: { MakeId: string, MakeName: string }) => (
                  <option key={make.MakeId} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </select>
              </>
              
            )}
          </Suspense>
        </div>

        {/* Select Year */}
        <div>
          <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Year</label>
          <select
            id="year"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Choose a Year</option>
            {[...Array(new Date().getFullYear() - 2014).keys()].map((i) => (
              <option key={i} value={2015 + i}>{2015 + i}</option>
            ))}
          </select>
        </div>

        {/* Next Button */}
        <Link
          href={`/result/${selectedMakeId}/${selectedYear}`}
          className={`mt-4 inline-block w-full py-2 px-4 text-center text-white bg-blue-500 rounded-lg disabled:bg-gray-300`}
          style={{ pointerEvents: selectedMakeId && selectedYear ? 'auto' : 'none' }}
        >
          Next
        </Link>
      </form>
    </section>
  );
}