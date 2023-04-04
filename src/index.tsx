import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import App from "./Components/App/App";
import "./index.css";
import { register } from "./serviceWorkerRegistration";

ReactDOM.render(
  <>
    <Helmet>
      <link rel="manifest" href="/manifest.webmanifest" />
      <meta name="theme-color" content="#000000" />
      <title>GPS Tracker</title>
    </Helmet>
    <App />
  </>,
  document.getElementById("root")
);

register();
