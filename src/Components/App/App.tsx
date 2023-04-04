import MapContainer from "../MapContainer/MapContainer";
import "./App.css";
import icon from "../../assets/icon.png";
function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <img alt="" src={icon} style={{ width: "60px" }} />
        <label className="titleStyle">GPS Tracker</label>
      </div>
      <div className="MapContainer">
        <MapContainer apiKey="AIzaSyDfyI7spKBQaIeg_eAzf_x1kJOulwjOxXY" />
      </div>
    </div>
  );
}

export default App;
