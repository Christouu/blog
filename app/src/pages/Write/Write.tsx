import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [value, setValue] = useState("");

  return (
    <div className="add">
      <div className="addContent">
        <input type="text" placeholder="Title" />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="addMenu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input type="file" id="file" style={{ display: "none" }} />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="category">
            <input type="radio" name="category" value="art" id="art" />
            <label htmlFor="art">ART</label>
          </div>
          <div className="category">
            <input type="radio" name="category" value="art" id="science" />
            <label htmlFor="science">Science</label>
          </div>
          <div className="category">
            <input type="radio" name="category" value="art" id="technology" />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="category">
            <input type="radio" name="category" value="art" id="cinema" />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="category">
            <input type="radio" name="category" value="art" id="design" />
            <label htmlFor="design">Design</label>
          </div>
          <div className="category">
            <input type="radio" name="category" value="art" id="food" />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
