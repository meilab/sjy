import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Helmet from "react-helmet";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/about-page.scss";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const AboutPageTemplate = (props) => {
  const { page } = props;

  return (
    <article className="about">
      <div className="about-container  container">
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('http://xhimg.sports.cn/Image/200910/7-20091016250V35.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
              backgroundColor: "#f40",
              color: "white",
              padding: "1rem",
            }}
          >
            {page.frontmatter.title}
          </h1>
        </div>
        {/* <section className="about-header">
          <div className="about-titleWrapper">
            <h1 className="about-title">{page.frontmatter.title}</h1>
          </div>
          <div className="about-imageWrapper">
            <PreviewCompatibleImage imageInfo={page.frontmatter.mainImage} />
          </div>
        </section> */}
        <section className="intro section">
          <h2 className="intro-title">{"协会介绍"}</h2>
          <div className="intro-container">
            {/* The page.html is actually markdown when viewing the page from the netlify CMS,
                so we must use the ReactMarkdown component to parse the markdown in that case  */}
            {/* {page.bodyIsMarkdown ? (
              <ReactMarkdown
                className="about-description"
                source={page.frontmatter.description}
              />
            ) : (
              <HTMLContent
                className="about-description"
                content={page.frontmatter.description}
              />
            )} */}
            <ReactMarkdown source={page.frontmatter.description} />
          </div>
        </section>
      </div>
      <section className="org section">
        <div className="org-container">
          <h2 className="org-title">{page.frontmatter.orgImage.name}</h2>
          {/* <div className="about-imageWrapper"> */}
          <div className="org-image">
            <PreviewCompatibleImage imageInfo={page.frontmatter.orgImage} />
          </div>
        </div>
      </section>
      <section className="section purpose">
        <div className="purpose-container">
          <h2 className="purpose-title">{page.frontmatter.purpose.title}</h2>
          <ul className="purpose-list">
            {page.frontmatter.purpose.gallery.map((galleryImage, index) => (
              <li key={index} className="purpose-listItem">
                <div
                  style={{ width: "300px", height: "auto" }}
                  className="purpose-listItemImage"
                >
                  <PreviewCompatibleImage imageInfo={galleryImage} />
                </div>
                <span className="purpose-listItemName">
                  {galleryImage.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="companyMember section">
        <h2 className="companyMember-title">
          {page.frontmatter.companyMember.title}
        </h2>
        <ul className="galleryList">
          {page.frontmatter.companyMember.gallery.map((galleryImage, index) => (
            <li key={index} className="galleryList-item">
              <PreviewCompatibleImage imageInfo={galleryImage} />
            </li>
          ))}
        </ul>
      </section>
      <section className="personalMember section">
        <h2 className="personalMember-title">
          {page.frontmatter.personalMember.title}
        </h2>
        <ul className="galleryList">
          {page.frontmatter.personalMember.gallery.map(
            (galleryImage, index) => (
              <li key={index} className="galleryList-item">
                <PreviewCompatibleImage imageInfo={galleryImage} />
                {/* <img src={galleryImage.image} alt={galleryImage.imageAlt} /> */}
              </li>
            ),
          )}
        </ul>
      </section>
    </article>
  );
};

const AboutPage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;

  return (
    <Layout>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <AboutPageTemplate page={{ ...page, bodyIsMarkdown: true }} />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        mainImage {
          image
          imageAlt
        }
        orgImage {
          image
          imageAlt
          name
        }
        description
        purpose {
          title
          gallery {
            image
            imageAlt
            name
          }
        }
        companyMember {
          title
          gallery {
            image
            imageAlt
            name
          }
        }
        personalMember {
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
`;
