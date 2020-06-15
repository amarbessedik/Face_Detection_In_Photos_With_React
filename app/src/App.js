import React, { Component } from "react";
import "./App.css";
import ImageSearchForm from "./components/ImageSearchForm/ImageSearchForm";
// import FaceDetect from "./components/FaceDetect/FaceDetect";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="app-title">Image Face Detection</h1>
        <ImageSearchForm />
        {/* <FaceDetect /> */}
      </div>
    );
  }
}
export default App;
