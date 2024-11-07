'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/app/shared/Loading';

interface VehicleModel {
  Model_Name: string;
  Make_Name: string;
}

export default function ResultPage() {
  const { make, year } = useParams();
  console.log(make)
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch models only if both makeId and year are available
    if (make && year) {
      const fetchModels = async () => {
        try {
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${make}/modelyear/${year}?format=json`
          );
          const data = await response.json();
          setModels(data.Results || []); // Set the vehicle models
          console.log(data.Results)
        } catch (error) {
          console.error('Error fetching models:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchModels();
    }
  }, [make, year]);

  if (loading) return <Loading/>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Models
      </h1>

      {models.length > 0 ? (
        <ul className="space-y-2">
          {models.map((model, index) => (
            <li key={index} className="border p-2 rounded-md">
              {model.Make_Name}: {model.Model_Name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found for this make and year.</p>
      )}
    </div>
  );
}