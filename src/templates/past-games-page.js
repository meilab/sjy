import React, { Component, Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import isBefore from "date-fns/is_before";
import ReactMarkdown from "react-markdown";

import GameMetaInfoTemplate from "./game-meta";
import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/past-games-page.scss";

export const PastGamesPageTemplate = ({
  title,
  content,
  games = null,
  bodyIsMarkdown = false,
}) => {
  const emptyQuery = "";
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState(emptyQuery);

  useEffect(() => {
    setFilteredData(games);
  }, []);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    // this is how we get all of our games
    // return all filtered games
    const filteredData =
      newQuery === emptyQuery
        ? games
        : games.filter((game) => {
            // destructure data from game frontmatter
            const { title } = game.node.frontmatter;
            return (
              // standardize data with .toLowerCase()
              // return true if the title
              // contains the newQuery string
              title.toLowerCase().includes(newQuery.toLowerCase())
            );
          });
    // update state according to the latest newQuery and results
    setFilteredData(filteredData);
    setQuery(newQuery);
  };

  return (
    <article className="pastGames">
      <div className="container  pastGames-container">
        <h1 className="pastGames-title">{title}</h1>
        {bodyIsMarkdown ? (
          <ReactMarkdown className="pastGames-description" source={content} />
        ) : (
          <HTMLContent className="pastGames-description" content={content} />
        )}
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{filteredData.length}</strong> 比赛
              </p>
            </div>
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    aria-label="Search"
                    placeholder="输入姓名或编号"
                    onChange={handleInputChange}
                  />
                </p>
                <p className="control">
                  <button className="button">搜索</button>
                </p>
              </div>
            </div>
          </div>
        </div>
        {filteredData &&
          filteredData.map((game, index) => (
            <GameMetaInfoTemplate
              key={index}
              className="pastGames-game"
              game={game.node.frontmatter}
              slug={game.node.fields.slug}
            />
          ))}
      </div>
    </article>
  );
};

PastGamesPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  games: PropTypes.array,
};

const PastGamesPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;
  let games = data.allMarkdownRemark.edges;

  // Find all the games that occured in the past
  games = games.filter((game) => {
    return isBefore(game.node.frontmatter.rawDate, new Date()) && game;
  });

  return (
    <Layout footerData={data.footerData} navbarData={data.navbarData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <PastGamesPageTemplate
        title={page.frontmatter.title}
        content={page.html}
        games={games}
      />
    </Layout>
  );
};

PastGamesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PastGamesPage;

export const pastGamesPageQuery = graphql`
  query PastGamesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        seo {
          browserTitle
          title
          description
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { events: { elemMatch: { text: { ne: null } } } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            formattedDate: date(formatString: "MMMM Do YYYY @ h:mm A")
            rawDate: date
            events {
              name
              image
              text
              eventDescription
              links {
                linkText
                linkURL
              }
            }
            location {
              name
            }
          }
        }
      }
    }
  }
`;
