import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import ToggleButton from "./Framer/toggle";
import DotBounceLoader from "./components/CustomLoader/DotLoader";
import LocationIcon from "./svgs/location";
import { COLORS } from "./components/constant/constants";
import { TrashIcon, XIcon } from "lucide-react";
const LazyMapView = lazy(() => import("./components/map-view"));

function App() {
  const [savedLocations, setSavedLocations] = useState([]);
  const [filteredLocationData, setLocationFilteredData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up in case component unmounts while modal is open
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal, savedLocations, selectedTitle]);

  const openPopUp = (title) => {
    setSelectedTitle(title);
    setShowModal(true);
    if (savedLocations.length) {
      const filterData = savedLocations.filter((ele) => {
        return ele.status.includes(title.toLowerCase());
      });
      setLocationFilteredData(filterData);
    }
  };

  const handleDelete = (id) => {
    // Remove from main savedLocations
    const updatedLocations = savedLocations.filter((ele) => ele.id !== id);
    setSavedLocations(updatedLocations);
    // Re-filter for modal view
    if (selectedTitle) {
      const newFiltered = updatedLocations.filter((ele) =>
        ele.status.includes(selectedTitle.toLowerCase())
      );
      setLocationFilteredData(newFiltered);
    } else {
      setLocationFilteredData(updatedLocations);
    }
  };

  return (
    <div
      className={`min-h-screen w-full text-gray-800 text-white transition-colors duration-300`}
    >
      {/* Header */}
      <header className=" py-4 px-6 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold text-[#1B998B] ">
          🧳 Travel Bucket List
        </h1>
        <ToggleButton />
      </header>

      {/* buttons */}
      <div className="flex w-1/2 px-4 max-w-6xl mx-auto gap-6 justify-around mt-8">
        {COLORS.map((ele) => (
          <button
            data-modal-target={ele.id}
            data-modal-toggle={ele.id}
            onClick={() => openPopUp(ele.title)}
            key={ele.title}
            type="button"
            className="flex items-center gap-1 py-1 px-3 shadow-sm border rounded-xl transition-colors border border-[#1B998B]"
          >
            <LocationIcon color={ele.color} />
            <p className="text-[#1B998B] transition-colors text-lg">
              {ele.title}
            </p>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <div className="p-4">
          <Suspense
            fallback={
              <div className="flex justify-center py-12">
                <DotBounceLoader />
              </div>
            }
          >
            <LazyMapView
              setSavedLocations={setSavedLocations}
              savedLocations={savedLocations}
            />
          </Suspense>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full light:bg-white/80 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 text-center py-6 text-base font-medium text-gray-600 dark:text-gray-300 shadow-inner">
        <span className="inline-flex items-center gap-1">
          <span className="text-xl">🌍</span>
          Made with <span className="text-pink-500 text-xl">💙</span> by
          <span className="ml-1 font-semibold text-[#1B998B] hover:underline cursor-pointer transition-all">
            Shilpa
          </span>
        </span>
      </footer>

      <div
        className={`${
          showModal ? "flex" : "hidden"
        } fixed top-35 left-0 right-0 bottom-0 z-[1000] justify-center items-center`}
      >
        <div class="relative p-4 w-full max-w-3xl h-full">
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[600px] min-h-[300px] overflow-y-scroll">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedTitle}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide={selectedTitle}
              >
                <XIcon />
              </button>
            </div>

            <div class="p-4 md:p-5 space-y-4">
              {filteredLocationData?.length > 0 ? (
                filteredLocationData?.map((ele) => {
                  return (
                    <ul class="flex flex-col max-w-full justify-center items-center space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                      <div
                        className="flex justify-between shadow-sm p-2 rounded-md w-full"
                        onClick={() => handleDelete(ele.id)}
                      >
                        <li className="flex justify-between items-center gap-2 text-md w-full">
                          Location: {ele.name}
                          <button className="text-red-400 flex items-center justify-end">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </li>
                      </div>
                    </ul>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-300">
                  <span className="text-4xl mb-2">🗺️</span>
                  <span className="text-lg font-semibold">No Data Found</span>
                  <span className="text-sm mt-1">
                    Try adding a location to this category!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
