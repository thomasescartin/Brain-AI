import "../style/NavBar.css";

import { Link } from "react-router-dom";

import Avatar from "../Avatar/Avatar";

import {
  FaHome,
  FaComments,
  FaProjectDiagram,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🧠 Brain_AI</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">
          <FaHome />
          Accueil
        </Link>

        <Link to="/discussion">
          <FaComments />
          Discussions
        </Link>

        <Link to="/projet">
          <FaProjectDiagram />
          Projets
        </Link>

        <Link to="/evenements">
          <FaCalendarAlt />
          Evènements
        </Link>
      </div>

      {token && (
        <Link to="/profile" className="navbar-profile">
          <Avatar size="small" />
        </Link>
      )}
    </nav>
  );
}
