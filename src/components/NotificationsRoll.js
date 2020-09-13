import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

function NotificationRoll({ data }) {
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

NotificationRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query NotificationRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "notifications-post" } } }
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
    render={(data, count) => <NotificationRoll data={data} count={count} />}
  />
);
