import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToggleButton from './Framer/toggle'

function App() {

  return (
    <div className={`min-h-screen w-full text-gray-800 dark:text-white transition-colors duration-300`}>
      {/* Header */}
      <header className=" py-4 px-6 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold text-blue-600 ">🧳 Travel Bucket List</h1>
        
     <ToggleButton/>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Paris, France</h2>
          <p className="text-gray-600 dark:text-gray-300">📅 April 2024</p>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            Strolled by the Eiffel Tower, ate croissants, and fell in love with the lights.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App
