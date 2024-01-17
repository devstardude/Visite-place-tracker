import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
    props.onInput(pickedFile);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div >
      <input
        className="form-control-file"
        id={props.id}
        style={{ display: "none" }}
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="container ImageUploadContainer px-md-0">
        <div className="image-upload__preview mx-auto mx-md-0">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Image Preview</p>}
        </div>
          <button
            className="btn btn-outline-secondary ImageUploadButton "
            type="button"
            onClick={pickImageHandler}
          >
            {props.buttonText}
          </button>
      </div>
    </div>
  );
};

export default ImageUpload;
