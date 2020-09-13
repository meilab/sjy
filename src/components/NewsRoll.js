import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import "../styles/news.scss";

function NewsRoll({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="news-container">
      {posts &&
        posts.map(({ node: post }) => (
          <Link className="news-item" key={post.id} to={post.fields.slug}>
            <p className="news-title">{post.frontmatter.title}</p>
            <p className="news-date">{post.frontmatter.date}</p>
          </Link>
        ))}
    </div>
  );
}

NewsRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query NewsRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "news-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                description
                featuredimage
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <NewsRoll data={data} count={count} />}
  />
);
