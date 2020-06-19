import React, { Component } from "react";
import Clarifai from "clarifai";
import "./App.css";
import ImageSearchForm from "./components/ImageSearchForm/ImageSearchForm";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import dotenv from "dotenv";

dotenv.config({ silent: true });

//create a new Clarifai app
const app = new Clarifai.App({
  apiKey: process.env.apiKey
  
});

class App extends Component {
  state = {
    input: "",
    imageUrl: "",
    boxes: [],
  };

  onChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) {
          this.setState({ boxes: response.outputs[0].data.regions });
          console.log("boxes from onSubmit: ", this.state.boxes);
        } else {
          console.log("No results");
        }
      })
      .catch((err) => {
        console.error(`Something's went wrong: ${err}`);
      });
  };

  copy = () => {
    const input = document.createElement('input');
    document.getElementById('copy-text-container').appendChild(input)
    input.value = document.getElementById("text").textContent;
    console.log(`input ${input.value}`);
    input.select();
    document.execCommand("copy");
    document.getElementById("copy-text-container").removeChild(input);
    window.alert('copied!')
  };

  render() {
    return (
      <div className="App">
        <h1 className="app-title">Image Face Detection</h1>
        <div id="copy-text-container">
          <p id="text">
            https://cdn.vox-cdn.com/thumbor/1ck1fQL62j2GaDvOlnJu4fyuIIc=/0x0:3049x2048/1200x800/filters:focal(1333x1562:1819x2048)/cdn.vox-cdn.com/uploads/chorus_image/image/63058104/fake_ai_faces.0.png
          </p>
          <button
            className="w20 f4 link ph2 pv1 dib white bg-blue"
            onClick={this.copy}
            id="btn"
          >Copy</button>
        </div>
        <ImageSearchForm onChange={this.onChange} onSubmit={this.onSubmit} />
        <FaceDetection boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}
export default App;
