'use client';
import { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('[PROJECT_ID]');

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const databases = new Databases(client);

    let promise = databases.listDocuments('[DATABASE_ID]', '[COLLECTION_ID]');

    promise.then(
      function (response) {
        setWorkouts(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <main className='h-3/4 mt-12 flex flex-col items-center justify-center '>
      <span className='p-4 inline-flex flex text-xs leading-5 ml-0 my-4 font-semibold rounded-lg  bg-blue-400 text-white mx-4'>
        Add A Workout
      </span>
      <table className=' w-3/4 bg-blue-50'>
        <thead>
          <tr className='rounded-lg'>
            <th className='px-6 py-3 border-b-2 border-white border-s-2 border-e-2 bg-blue-500 text-left text-xs text-white leading-4 uppercase tracking-wider'>
              Exercise Name
            </th>
            <th className='px-6 py-3 border-b-2 border-white border-e-2 bg-blue-500 text-left text-xs text-white leading-4 uppercase tracking-wider'>
              Sets
            </th>
            <th className='px-6 py-3 border-b-2 border-white border-e-2 bg-blue-500 text-left text-xs text-white leading-4 uppercase tracking-wider'>
              Reps
            </th>
            <th className='px-6 py-3 border-b-2 border-white border-e-2 bg-blue-500 text-left text-xs text-white leading-4 uppercase tracking-wider'>
              How did you feel?
            </th>
            <th className='px-6 py-3 border-b-2 border-white border-e-2 bg-blue-500 text-left text-xs text-white leading-4 uppercase tracking-wider'>
              Workout Status
            </th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout.$id}>
              <td className='px-6 py-4 whitespace-no-wrap  border-white border-b-2 border-e-2'>
                <div className='flex items-center'>
                  <div className='text-sm leading-5 font-medium text-gray-900'>
                    {workout.workout}
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-no-wrap  border-white border-b-2 border-e-2'>
                <div className='flex items-center'>
                  <div className='text-sm leading-5 font-medium text-gray-900'>
                    {workout.sets}
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-no-wrap  border-white border-b-2 border-e-2'>
                <div className='flex items-center'>
                  <div className='text-sm leading-5 font-medium text-gray-900'>
                    {workout.reps}
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 border-white border-b-2 border-e-2'>
                <div className='flex items-center'>
                  <div className='text-sm leading-5 font-medium text-gray-900'>
                    {workout.feels}
                  </div>
                </div>
              </td>
              <td className='px-6 py-12 text-right border-white border-b-2 border-e-2 text-sm leading-5 font-medium'>
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                  Active
                </span>
                <a
                  href='#'
                  className='text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline'
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
