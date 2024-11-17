import { useState } from "react";
import "./App.scss";
import { MultiSelect } from "./components/MultiSelect";

import fakeData from "./fakeData.json";

function App() {
  const [data, setData] = useState(fakeData);

  const addItem = (label, value) => {
    const newItem = { label, value };
    setData((prevData) => [...prevData, newItem]);
  };
  return (
    <div className="App">
      <MultiSelect addNewItem={(value) => addItem(value, value)} items={data} />
    </div>
  );
}

export default App;
