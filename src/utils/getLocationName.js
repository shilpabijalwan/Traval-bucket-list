export const getLocationName = async ([lat, lng]) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    return data.display_name; // This contains the full address
  } catch (err) {
    console.error("Reverse geocoding failed", err);
    return "Unknown location";
  }
};
