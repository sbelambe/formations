import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

const MusicSplitterWithUpload = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    // Initialize WaveSurfer with the Regions plugin
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "#2196f3",
      height: 200,
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
      wavesurfer.current.destroy();
    };
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      wavesurfer.current.load(objectUrl);
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
    wavesurfer.current.regions.list[id].remove();
  };

  const handleAttachLabel = (id, label) => {
    setRegions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, label } : r))
    );
  };

  return (
    <div>
      <h1>Music Splitter</h1>
      <p>Upload an MP3 file to get started.</p>
      <input type="file" accept="audio/mp3" onChange={handleFileUpload} />
      <div ref={waveformRef} style={{ width: "100%", height: "200px", margin: "20px 0" }}></div>
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

export default MusicSplitterWithUpload;
