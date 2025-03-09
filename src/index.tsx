import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import App from "./App"
import "./styles/main.scss"
import "primereact/resources/themes/lara-light-teal/theme.css"
import "primeicons/primeicons.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
