import {BrowserRouter, Navigate, Route, RouteProps, Routes} from "react-router-dom"
import {useCallback} from "react"
import {DEFAULT_ROUTE} from "./constants/constants"
import {RouteConfig} from "./routes"
import {addLocale, PrimeReactProvider} from "primereact/api"
import {ToastContainer} from "react-toastify"
import {ruLocale} from "./ruLocalePrimeReact"

function App() {
  const render = useCallback(({element, path}: RouteProps) => {
    return <Route key={path} path={path} element={element} />
  }, [])

  addLocale("ru", ruLocale)

  return (
    <BrowserRouter>
      <PrimeReactProvider>
        <Routes>
          {Object.values(RouteConfig).map(render)}
          <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace />} />
        </Routes>
        <ToastContainer />
      </PrimeReactProvider>
    </BrowserRouter>
  )
}

export default App
