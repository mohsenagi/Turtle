import React, { useState } from "react";
import "./App.css";

import { Grid } from "./components/gridComp.js";
import { Path } from "./components/path.js";
import { UploadForm } from "./components/uploadForm.js";

function App() {
  // arrayDict stores all location points in locationHistory array and all duplicate points in duplicates array
  const[arraysDict, setarraysDict] = useState({'locationHistory' : [], 'duplicates' : []});

  const updatePoints = (locationHistory, duplicates) => {
    setarraysDict({'locationHistory' : locationHistory, 'duplicates' : duplicates});
  };

  return (
    <div className="App">
      <main>
        <div className="canvasWrapper">
          <Grid />
          <Path
            id={"path"}
            arraysDict={arraysDict}
            lineColour={"rgb(0, 0, 255)"}
            lineWidth = {4}
            dotSize = {3}
            dotColor = {"rgb(255, 0, 0)"}
            />
        </div>
        <UploadForm
          updatePoints = {updatePoints}
        />
      </main>
    </div>
  );
};

export default App;
