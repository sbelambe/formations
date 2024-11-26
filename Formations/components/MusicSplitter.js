import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

const MusicSplitter = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [regions, setRegions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize WaveSurfer with the Regions plugin
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "#2196f3",
      height: 200,
      responsive: true,
      plugins: [
        RegionsPlugin.create({
          dragSelection: true, // Enable creating regions by dragging on the waveform
        }),
      ],
    });

    // Listen for region events
    wavesurfer.current.on("region-created", (region) => {
      addRegion(region);
    });

    wavesurfer.current.on("region-updated", (region) => {
      updateRegion(region);
    });

    wavesurfer.current.on("region-removed", (region) => {
      removeRegion(region.id);
    });

    return () => {
      if (wavesurfer.current) wavesurfer.current.destroy();
    };
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      wavesurfer.current.load(objectUrl);
    } else {
      console.error("No file selected or unsupported format.");
    }
  };

  const addRegion = (region) => {
    setRegions((prev) => [
      ...prev,
      {
        id: region.id,
        start: region.start,
        end: region.end,
        color: region.color || "rgba(0, 0, 255, 0.2)",
      },
    ]);
  };

  const updateRegion = (region) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.id === region.id
          ? { ...r, start: region.start, end: region.end }
          : r
      )
    );
  };

  const removeRegion = (id) => {
    setRegions((prev) => prev.filter((region) => region.id !== id));
  };

  const handleDeleteRegion = (id) => {
    if (wavesurfer.current.regions.list[id]) {
      wavesurfer.current.regions.list[id].remove();
    }
  };

  const handleAttachLabel = (id, label) => {
    setRegions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, label } : r))
    );
  };

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying((prev) => !prev);
    }
  };

  return (
    <div>
      <h1>Music Splitter</h1>
      <p>Upload an MP3 file to get started.</p>
      <input type="file" accept="audio/*" onChange={handleFileUpload} />
      <div
        ref={waveformRef}
        style={{
          width: "100%",
          height: "200px",
          margin: "20px 0",
          backgroundColor: "#f4f4f4",
        }}
      ></div>
      <button onClick={togglePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <ul>
        {regions.map((region) => (
          <li key={region.id}>
            Region: {region.start.toFixed(2)}s - {region.end.toFixed(2)}s
            <input
              type="text"
              placeholder="Enter label"
              onBlur={(e) => handleAttachLabel(region.id, e.target.value)}
            />
            <button onClick={() => handleDeleteRegion(region.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicSplitter;
