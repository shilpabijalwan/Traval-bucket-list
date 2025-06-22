import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DeleteIcon } from "../svgs/delete-icon";
import { getTextColor } from "../utils/getTextColor";
import { getLocationName } from "../utils/getLocationName";

// Fix Leaflet icon paths for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

// 🎨 Custom colored SVG icon
const CustomMarkerIcon = (color = "green") =>
  L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="${color}" width="32" height="32" viewBox="0 0 24 24">
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
    `,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

// 🔍 Get place name from coordinates

// 📍 Track click and move
function LocationMarker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

// 🔄 Center the map to selected location
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center]);
  return null;
}

function MapView({ savedLocations, setSavedLocations }) {
  const [userLocation, setUserLocation] = useState([20.5937, 78.9629]);
  const [locationFetched, setLocationFetched] = useState(false);
  // const [savedLocations, setSavedLocations] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [pendingLocation, setPendingLocation] = useState(null);
  const [statusChoice, setStatusChoice] = useState("");
  const [blockSelection, setBlockSelection] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLocationFetched(true);
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        setLocationFetched(true);
      }
    );
  }, []);

  // location select
  const handleSelect = async (coords) => {
    setPendingLocation(null);
    setStatusChoice("");
    if (blockSelection) return;
    const name = await getLocationName(coords);
    setPendingLocation(coords);
    setPlaceName(name);
  };

  // handle delete location select
  const handleDeleteSaveLocation = (e, loc) => {
    e.stopPropagation();
    e.preventDefault();
    setSavedLocations((prev) => prev.filter((ele) => ele.id !== loc.id));

    setBlockSelection(true);
    setTimeout(() => {
      setBlockSelection(false);
    }, 300);
  };

  //save location
  const handleSave = () => {
    const alreadyExists = savedLocations.some(
      (loc) =>
        loc.coords[0] === pendingLocation[0] &&
        loc.coords[1] === pendingLocation[1]
    );
    if (alreadyExists) {
      alert("Location already saved.");
      return;
    }

    setSavedLocations((prev) => [
      ...prev,
      {
        coords: pendingLocation,
        name: placeName,
        status: statusChoice,
        id: uuidv4(),
      },
    ]);
    setPendingLocation(null);
    setStatusChoice("");
  };

  return (
    <div className="w-full">
      <MapContainer
        center={userLocation}
        zoom={locationFetched ? 6 : 4}
        scrollWheelZoom
        className="h-[500px] w-full rounded shadow"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeView center={userLocation} />

        <Marker position={userLocation} icon={CustomMarkerIcon("green")}>
          <Popup>📍 Current Location</Popup>
        </Marker>

        <LocationMarker onSelect={handleSelect} />

        {savedLocations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.coords}
            icon={
              loc.status === "visited"
                ? CustomMarkerIcon("purple")
                : loc.status === "planning"
                ? CustomMarkerIcon("orange")
                : CustomMarkerIcon("blue")
            }
          >
            <Popup>
              <div className="">
                <strong>{loc.name}</strong>
                <p className="bold">
                  Status:{" "}
                  <span className={`${getTextColor(loc.status)}`}>
                    {loc.status}
                  </span>
                </p>
                Lat: {loc.coords[0].toFixed(4)}, Lng: {loc.coords[1].toFixed(4)}
                <div className="mt-2 flex justify-end">
                  <button onClick={(e) => handleDeleteSaveLocation(e, loc)}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {pendingLocation && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded shadow-lg z-[1000] w-[300px]">
          <h3 className="font-semibold text-lg mb-2">Save this place</h3>
          <p className="text-sm mb-4">{placeName}</p>

          <div className="space-y-2 mb-4">
            {["wishlist", "planning", "visited"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value={type}
                  checked={statusChoice === type}
                  onChange={(e) => setStatusChoice(e.target.value)}
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-sm"
              onClick={() => {
                setPendingLocation(null);
                setStatusChoice("");
              }}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
              disabled={!statusChoice}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapView;
