import axios from "axios";
import moment from "moment";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();

  //File is for types for uploading files
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(state?.title || "");
  const [category, setCategory] = useState(state?.category || "");
  const [description, setDescription] = useState(state?.description || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      //"file" here is like express name "file"
      //@ts-ignore
      formData.append("file", file);
      const response = await axios.post("/upload", formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //don't add images DataBase (bad practice), use cloud service (fire storage)
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            description,
            category,
            image: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            description,
            category,
            image: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="addContent">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={description}
            onChange={setDescription}
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
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //[0] is because we are uploading one file and its array so files[0]
              setFile(e.target.files![0])
            }
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish Post</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="category">
            <input
              type="radio"
              name="category"
              value="art"
              id="art"
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "art"}
            />
            <label htmlFor="art">ART</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="category"
              value="science"
              id="science"
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "science"}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="category"
              value="technology"
              id="technology"
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "technology"}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="category"
              value="cinema"
              id="cinema"
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "cinema"}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="category"
              value="design"
              id="design"
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "design"}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="category"
              value="food"
              id="food"
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "food"}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
