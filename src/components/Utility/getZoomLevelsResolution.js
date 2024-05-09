

// Data
    // const data = [
    //     { zoom: 0, resolution: 156543.03 },
    //     { zoom: 1, resolution: 78271.52 },
    //     { zoom: 2, resolution: 39135.76 },
    //     { zoom: 3, resolution: 19567.88 },
    //     { zoom: 4, resolution: 9783.94 },
    //     { zoom: 5, resolution: 4891.97 },
    //     { zoom: 6, resolution: 2445.98 },
    //     { zoom: 7, resolution: 1222.99 },
    //     { zoom: 8, resolution: 611.50 },
    //     { zoom: 9, resolution: 305.75 },
    //     { zoom: 10, resolution: 152.87 },
    //     { zoom: 11, resolution: 76.437},
    //     { zoom: 12, resolution: 38.219 },
    //     { zoom: 13, resolution: 19.109 },
    //     { zoom: 14, resolution: 9.5546 },
    //     { zoom: 15, resolution: 4.7773 },
    //     { zoom: 16, resolution: 2.3887 },
    //     { zoom: 17, resolution: 1.1943 },
    //     { zoom: 18, resolution: 0.5972 },
    // ];
    function linearInterpolation(y0, y1, x) {
        return y0 + (y1 - y0) * x;
    }
    
    // Dataset
    const data = [
        { zoom: 0, resolution: 156543.03 },
        { zoom: 1, resolution: 78271.52 },
        { zoom: 2, resolution: 39135.76 },
        { zoom: 3, resolution: 19567.88 },
        { zoom: 4, resolution: 9783.94 },
        { zoom: 5, resolution: 4891.97 },
        { zoom: 6, resolution: 2445.98 },
        { zoom: 7, resolution: 1222.99 },
        { zoom: 8, resolution: 611.50 },
        { zoom: 9, resolution: 305.75 },
        { zoom: 10, resolution: 152.87 },
        { zoom: 11, resolution: 76.437},
        { zoom: 12, resolution: 38.219 },
        { zoom: 13, resolution: 19.109 },
        { zoom: 14, resolution: 9.5546 },
        { zoom: 15, resolution: 4.7773 },
        { zoom: 16, resolution: 2.3887 },
        { zoom: 17, resolution: 1.1943 },
        { zoom: 18, resolution: 0.5972 },
    ];
    
    // Function to get resolution based on zoom value
    const getResolution = (zoom) => {
        if (zoom < 0) return null; // Handle zoom levels less than 0
    
        if (zoom < 1) {
            // Perform linear interpolation between resolutions at zoom levels 0 and 1
            const entry0 = data.find((entry) => entry.zoom === 0);
            const entry1 = data.find((entry) => entry.zoom === 1);
            return linearInterpolation(entry0.resolution, entry1.resolution, zoom);
        } else if (zoom <= 18) {
            // For zoom levels 1 to 18, use the dataset
            const floorZoom = Math.floor(zoom);
            const entry0 = data.find((entry) => entry.zoom === floorZoom);
            const entry1 = data.find((entry) => entry.zoom === (floorZoom + 1));
            if (!entry1) return entry0.resolution; // Handle case where there's no entry for next zoom level
            return linearInterpolation(entry0.resolution, entry1.resolution, zoom - floorZoom);
        } else {
            // For zoom levels beyond 18, extrapolate using the last two entries in the dataset
            const lastEntry = data[data.length - 1];
            const secondLastEntry = data[data.length - 2];
            const slope = (lastEntry.resolution - secondLastEntry.resolution) / (lastEntry.zoom - secondLastEntry.zoom);
            return lastEntry.resolution + slope * (zoom - lastEntry.zoom);
        }
    };

export default getResolution