export default function generateRandomCoordinates(lat, lon) {
    // Convert latitude and longitude from degrees to radians
    const minRadius = 200; 
    const maxRadius = 300;
    const latInRadians = lat * Math.PI / 180;
    const lonInRadians = lon * Math.PI / 180;

    // Generate random offset within the specified range (in meters)
    const randomRadius = Math.random() * (maxRadius - minRadius) + minRadius;

    // Generate random angle in radians
    const randomAngle = Math.random() * 2 * Math.PI;

    // Calculate new latitude and longitude
    const newLat = latInRadians + (randomRadius / 6371000) * Math.cos(randomAngle);
    const newLon = lonInRadians + (randomRadius / (6371000 * Math.cos(latInRadians))) * Math.sin(randomAngle);

    // Convert back from radians to degrees
    const newLatInDegrees = newLat * 180 / Math.PI;
    const newLonInDegrees = newLon * 180 / Math.PI;

    return { latitude: newLatInDegrees, longitude: newLonInDegrees };
}