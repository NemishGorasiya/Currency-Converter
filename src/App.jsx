import "./App.css";
import Converter from "./components/Converter";
function App() {
  // console.log("re render App js");
  return (
    <div className="main">
      <h1 className="heading">Currency converter</h1>
      <Converter />
    </div>
  );
}

export default App;
