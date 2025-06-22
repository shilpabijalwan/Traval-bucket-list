import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import ToggleButton from "./Framer/toggle";
import DotBounceLoader from "./components/CustomLoader/DotLoader";
import LocationIcon from "./svgs/location";
const LazyMapView = lazy(() => import("./components/map-view"));

function App() {
  return (
    <div
      className={`min-h-screen w-full text-gray-800 dark:text-white transition-colors duration-300`}
    >
      {/* Header */}
      <header className=" py-4 px-6 flex justify-between items-center shadow border">
        <h1 className="text-2xl font-bold text-blue-600 ">
          🧳 Travel Bucket List
        </h1>
        <ToggleButton />
      </header>

      <div className="w-1/2 flex-col px-4  max-w-6xl mx-auto border gap-6">
        <div className="py-1">
          <LocationIcon color={"green"} />
        </div>
        <div className="py-1">
          <LocationIcon color={"blue"} />
        </div>
        <div className="py-1">
          <LocationIcon color={"red"} />
        </div>
        <div className="py-1">
          <LocationIcon color={"orange"} />
        </div>
      </div>

      {/* Main Content */}

      <main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <div className="p-4">
          <Suspense
            fallback={
              <div className="flex justify-center py-12">
                <DotBounceLoader />
              </div>
            }
          >
            <LazyMapView />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        🌍 Made with 💙 by Shilpa
      </footer>
    </div>
  );
}

export default App;
