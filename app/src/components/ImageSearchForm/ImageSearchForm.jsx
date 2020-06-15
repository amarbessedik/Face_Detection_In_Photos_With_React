import React from 'react';
import './ImageSearchForm.css';
import 'tachyons';

const ImageSearchForm = () => {
  return (
    <div className="ma5 to">
      <div className="center">
        <div className="form center pa4 br3 shadow-2">
          <input className="f4 pa2 w-80 center" type="text" />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-blue">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageSearchForm;