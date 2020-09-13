import React from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
// import logo from "../img/logo.svg";
import logo from "../img/yoga-header-logo.jpeg";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      },
    );
  };

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              {/* <img src={logo} alt="Yoga" style={{ width: "88px" }} /> */}
              陕西省健身瑜伽协会
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                协会介绍
              </Link>
              <Link className="navbar-item" to="/notifications">
                公告通知
              </Link>
              <Link className="navbar-item" to="/pastGames">
                赛事活动
              </Link>
              {/* <Link className="navbar-item" to="/certificate"> */}
              <Link className="navbar-item" to="/coming">
                证书查询
              </Link>
              <Link className="navbar-item" to="/culture">
                瑜伽文化
              </Link>
              <Link className="navbar-item" to="/coming">
                下载专区
              </Link>
              {/* <Link className="navbar-item" to="/products">
                产品
              </Link> */}
              {/* <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link> */}
              {/* <Link className="navbar-item" to="/home2">
                Home2
              </Link> */}
            </div>
            {/* <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={github} alt="Github" />
                </span>
              </a>
            </div> */}
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
