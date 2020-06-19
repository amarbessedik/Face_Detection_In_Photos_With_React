import React, { Component } from "react";
import Clarifai from "clarifai";
import "./App.css";
import ImageSearchForm from "./components/ImageSearchForm/ImageSearchForm";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import dotenv from "dotenv";

dotenv.config({ silent: true });

//create a new Clarifai app
const app = new Clarifai.App({
  apiKey: 'YOUR-KEY-HERE'
  // apiKey: process.env.apiKey
});

class App extends Component {
  state = {
    input: "",
    imageUrl: "",
    boxes: [],
  };

  // this function calculate the facedetect location in the image
  calculateFaceLocation = (data) => {
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map((face) => {
      const boundingBox = face.region_info.bounding_box;
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - boundingBox.right_col * width,
        bottomRow: height - boundingBox.bottom_row * height,
      };
    });
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      // if error exist console.log error
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <ImageSearchForm onChange={this.onChange} onSubmit={this.onSubmit} />
        <FaceDetection
          boxes={this.state.boxes}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}
export default App;
