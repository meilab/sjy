import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";
import isAfter from "date-fns/is_after";

import Layout from "../components/Layout";
// import Map from "../components/Map";
import CustomLink from "../components/CustomLink";
import "../styles/home.scss";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import TrainingRoll from "../components/TrainingRoll";
import NotificationsRoll from "../components/NotificationsRoll";
import NewsRoll from "../components/NewsRoll";
import GameRoll from "../components/GameRoll";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomePageTemplate = ({ home, upcomingGame = null }) => {
  const [curTab, setCurTab] = useState("1");

  const events = upcomingGame && upcomingGame.events;
  const latitude =
    upcomingGame && parseFloat(upcomingGame.location.mapsLatitude);
  const longitude =
    upcomingGame && parseFloat(upcomingGame.location.mapsLongitude);

  let settings = {
    dots: true,
    arrows: true,
    autoplay: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const renderInfo = () => {
    if (curTab === "1") {
      return <NewsRoll />;
    } else {
      return <NotificationsRoll />;
    }
  };
  return (
    <>
      <section className="header">
        <div
          className="header-container container"
          style={{
            maxWidth: "100%",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundImage: `url('http://xhimg.sports.cn/Image/200910/7-20091016250V35.jpg')`,
          }}
        >
          {home.headerImage && (
            <div
              style={{ width: "300px", height: "auto" }}
              className="upcomingGame-presenterImage"
            >
              <PreviewCompatibleImage imageInfo={home.headerImage} />
            </div>
          )}
          <h3 className="header-tagline">
            <span className="header-taglinePart">{home.title}</span>
          </h3>
        </div>
      </section>
      <section className="notificationsAndNews section ">
        <div className="container columns">
          <Slider
            {...settings}
            className="is-parent column is-7 notificationsAndNews-container container"
          >
            {home.carousel.gallery.map((galleryImage, index) => (
              <div key={index} className={`item-${index}`}>
                <PreviewCompatibleImage imageInfo={galleryImage} />
              </div>
            ))}
          </Slider>
          <div className="column is-5 notificationsAndNews-container container">
            <div className="column is-12">
              <div className="news-title-container">
                <Link className="subtitle is-5 news-title-item" to="/news">
                  <h3
                    className={`notificationsAndNews-pointer-title is-size-2 ${
                      curTab === "1" ? "active" : ""
                    }`}
                    onMouseEnter={() => {
                      setCurTab("1");
                    }}
                  >
                    资讯
                  </h3>
                </Link>
                <Link
                  className="subtitle is-5 news-title-item"
                  to="/notifications"
                >
                  <h3
                    className={`notificationsAndNews-pointer-title is-size-2 ${
                      curTab === "2" ? "active" : ""
                    }`}
                    onMouseEnter={() => {
                      setCurTab("2");
                    }}
                  >
                    通告
                  </h3>
                </Link>
              </div>
              {renderInfo()}
            </div>
          </div>
        </div>
      </section>
      {/* <section className="upcomingGame  section">
        <div className="upcomingGame-container  container">
          <h2 className="upcomingGame-title">{home.upcomingGameHeading}</h2>
          {upcomingGame ? (
            <>
              <p className="upcomingGame-detail  upcomingGame-detail--date">
                <span className="upcomingGame-detailLabel">Date: </span>
                {upcomingGame.formattedDate}
              </p>
              <p className="upcomingGame-detail  upcomingGame-detail--location">
                <span className="upcomingGame-detailLabel">Location: </span>
                {upcomingGame.location.name}
              </p>
              {events.length > 0 && (
                <div className="upcomingGame-events">
                  {events.map((presenter) => (
                    <div
                      className="upcomingGame-presenter"
                      key={presenter.text}
                    >
                      <div
                        style={{ width: "300px", height: "auto" }}
                        className="upcomingGame-presenterImage"
                      >
                        <PreviewCompatibleImage
                          className="upcomingGame-presenterImage"
                          imageInfo={presenter.image}
                        />
                      </div>
                      <span className="upcomingGame-presenterName">
                        {presenter.name}
                      </span>
                      <span className="upcomingGame-presenterPresentationTitle">
                        {presenter.eventDescription}
                      </span>
                      <p className="upcomingGame-presenterDescription">
                        {presenter.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <p className="upcomingGame-mapNote">{home.mapsNote}</p>
              <div className="upcomingGame-mapWrapper">
                <Map
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTxauB_VWpo0_8hWELlE3pN59uuHzxD-8&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  link={upcomingGame.location.mapsLink}
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>
            </>
          ) : (
            <p className="upcomingGame-detail">{home.noUpcomingGameText}</p>
          )}
        </div>
      </section> */}
      {/* <section className="ctaBlock">
        <CustomLink
          linkType={home.callToActions.firstCTA.linkType}
          linkURL={home.callToActions.firstCTA.linkURL}
          className="ctaBlock-pattern  ctaBlock-pattern--first"
        >
          <div className="ctaBlock-cta">
            <span className="ctaBlock-ctaHeading">
              {home.callToActions.firstCTA.heading}
            </span>
            <p className="ctaBlock-ctaDescription">
              {home.callToActions.firstCTA.subHeading}
            </p>
          </div>
        </CustomLink>
        <CustomLink
          linkType={home.callToActions.secondCTA.linkType}
          linkURL={home.callToActions.secondCTA.linkURL}
          className="ctaBlock-pattern  ctaBlock-pattern--second"
        >
          <div className="ctaBlock-cta">
            <span className="ctaBlock-ctaHeading">
              {home.callToActions.secondCTA.heading}
            </span>
            <p className="ctaBlock-ctaDescription">
              {home.callToActions.secondCTA.subHeading}
            </p>
          </div>
        </CustomLink>
      </section> */}
      <section className="games section">
        <div className="game-container columns container">
          <div className="column is-12">
            <h3 className="games-title has-text-weight-semibold is-size-2">
              赛事活动
            </h3>
            <GameRoll />
            <div className="column is-12 has-text-centered">
              <Link className="btn" to="/notifications">
                更多赛事
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="trainings  section">
        <div className="training-container columns container">
          <div className="column is-12">
            <h3 className="trainings-title has-text-weight-semibold is-size-2">
              培训认证
            </h3>
            <TrainingRoll />
            <div className="column is-12 has-text-centered">
              <Link className="btn" to="/training">
                更多培训
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="cooperation section">
        <h2 className="cooperation-title">{home.cooperation.title}</h2>
        <div className="cooperation-container">
          <div className="cooperation-list">
            {home.cooperation.gallery.map((galleryImage, index) => (
              <div key={index} className="cooperation-list-item">
                <PreviewCompatibleImage imageInfo={galleryImage} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, navbarData },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    } = home;
    let upcomingGame = null;
    // Find the next meetup that is closest to today
    data.allMarkdownRemark.edges.every((item) => {
      const { frontmatter: meetup } = item.node;
      if (isAfter(meetup.rawDate, new Date())) {
        upcomingGame = meetup;
        return true;
      } else {
        return false;
      }
    });
    return (
      <Layout footerData={footerData} navbarData={navbarData}>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
        </Helmet>
        <HomePageTemplate home={home} upcomingGame={upcomingGame} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { events: { elemMatch: { text: { ne: null } } } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            formattedDate: date(formatString: "MMMM Do YYYY @ h:mm A")
            rawDate: date
            events {
              name
              image
              text
              eventDescription
            }
            location {
              mapsLatitude
              mapsLongitude
              mapsLink
              name
            }
          }
        }
      }
    }
    homePageData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "index-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            headerImage {
              image
              imageAlt
            }
            carousel {
              title
              gallery {
                image
                imageAlt
                name
                url
              }
            }
            cooperation {
              title
              gallery {
                image
                imageAlt
                name
              }
            }
            seo {
              browserTitle
              title
              description
            }
          }
        }
      }
    }
  }
`;
