// app/result/[make]/generateStaticParams.ts

// Define the type for the Make data structure
interface Make {
    MakeId: number;
    MakeName: string;
  }
  
  export async function generateStaticParams() {
    const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
    const data = await response.json();
    const makes: Make[] = data.Results; // Use the Make type to correctly type the data
  
    // Define the year range (2015 to current year)
    const startYear = 2015;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  
    const paths = makes.flatMap((make) =>
      years.map((year) => ({
        params: {
          make: make.MakeId.toString(), // Use MakeId here
          year: year.toString(),
        }
      }))
    );
  
    return paths;
  }