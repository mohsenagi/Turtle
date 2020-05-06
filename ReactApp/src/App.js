import React, { useState } from "react";
import "./App.css";

import { Grid } from "./components/gridComp.js";
import { Path } from "./components/path.js";
import { UploadForm } from "./components/uploadForm.js";

function App() {
  const[arraysDic, setarraysDic] = useState({'locationHistory' : [], 'duplicates' : []});

  const updatePoints = (locationHistory, duplicates) => {
    let id = window.setTimeout(() => {}, 0);
    while (id--) {
    window.clearTimeout(id); // if users upload new file while drawing path from previous file, this will clear the remaining timeouts
    };
    setarraysDic({'locationHistory' : locationHistory, 'duplicates' : duplicates});
  };

  return (
    <div className="App">
      <main>
        <div className="canvasWrapper">
          <Grid />
          <Path
            id={"path"}
            arraysDic={arraysDic}
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
