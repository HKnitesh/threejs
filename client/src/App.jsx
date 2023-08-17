import CanvasModel from "./canvasModel"
import Customizer from "./pages/Customizer"
import Home from "./pages/Home"


function App() {
  

  return (
    <main className="app transition-all ease-in duration-300">

      <Home />
      <CanvasModel />
      <Customizer />

    </main>
  )
}

export default App
