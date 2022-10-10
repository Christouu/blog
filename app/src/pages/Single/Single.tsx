import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import Menu from "../../components/Menu/Menu";
import { IPost } from "../../interfaces/post";
import { AuthContext } from "../../context/authContext";

const Single = () => {
  const [post, setPost] = useState<IPost>({
    id: 0,
    title: "",
    description: "",
    image: "",
    category: "",
  });

  //get the category from url
  const category = useLocation();
  const postId = category.pathname.split("/")[2];
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  //fetch data based ot category from url
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IPost>(`/posts/${postId}`);

        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post?.image} alt="some image" />
        <div className="user">
          {post?.userImg && <img src={post.userImg} alt="profile picture" />}
          <div className="userInfo">
            <span className="name">{post?.username}</span>
            <p className="posted">posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post?.username && (
            <div className="edit">
              <Link to={`/write?edit=2`}>
                <img src={Edit} alt="edit image" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="delete image" />
            </div>
          )}
        </div>

        <h1>{post.title}</h1>
        <p className="description">{post.description}</p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
