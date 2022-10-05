import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Viktor_0.jpg"
          alt="some image"
        />
        <div className="user">
          <img
            src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Viktor_0.jpg"
            alt="profile picture"
          />
          <div className="userInfo">
            <span className="name">Kristou</span>
            <p className="posted">posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="edit image" />
            </Link>
            <img src={Delete} alt="delete image" />
          </div>
        </div>

        <h1>TITLE</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
          adipisci vel sunt ex harum, dolorum rem, nulla vitae libero ratione
          quaerat nobis quas impedit minus repudiandae quisquam expedita. Libero
          non laboriosam ducimus iusto eligendi! Quas dolor laboriosam quo iure
          sunt, aspernatur, aliquam tenetur qui porro magnam recusandae
          accusamus fuga iste? Nobis incidunt numquam, iusto labore animi hic
          quasi necessitatibus illum temporibus corrupti provident magni optio
          autem vel laudantium fuga odit officiis sequi sit rerum rem tenetur.
          Consequatur eius praesentium incidunt ratione, suscipit voluptate
          esse, perspiciatis sequi deleniti aperiam adipisci dicta, nihil nulla
          voluptatem. Id labore neque ipsa corrupti recusandae accusantium!
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
