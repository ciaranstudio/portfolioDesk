import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import WavesIcon from "@mui/icons-material/Waves";

function Root() {
  return (
    <>
      <App />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <a
          style={{
            position: "absolute",
            top: 30,
            left: 63,
            fontSize: "11px",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            const email = "ciaranstudio@icloud.com";
            const subject = "Contact from portfolio";
            // const emailBody = "";
            document.location = "mailto:" + email + "?subject=" + subject;
            // +
            // "&body=" +
            // emailBody;
          }}
        >
          ciaran okeeffe
          <br />
          <i style={{ color: "grey", fontSize: "0.65rem" }}>web dev</i>
        </a>
        <a
          href="https://github.com/chairawn/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            top: 30,
            right: 25,
            fontSize: "11px",
            cursor: "pointer",
          }}
        >
          gitHub
        </a>
        <WavesIcon
          style={{
            position: "absolute",
            top: 31,
            left: 25,
            width: 30,
            cursor: "pointer",
            color: "#808080",
          }}
          onClick={(e) => {
            e.stopPropagation();
            const email = "ciaranstudio@icloud.com";
            const subject = "Contact from portfolio";
            document.location = "mailto:" + email + "?subject=" + subject;
          }}
        />
      </div>
      <div
        id="footer"
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          width: 75,
          fontSize: "0.75rem",
        }}
      ></div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
