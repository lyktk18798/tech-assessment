import React from "react";
import "./App.css";
import { ShortenUrl } from "./components/ShortenUrl";
import { Layout, Space } from "antd";
const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <div className="content">
            <ShortenUrl />
      </div>
    </div>
  );
}

export default App;
