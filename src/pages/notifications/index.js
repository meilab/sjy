import React from "react";

import Layout from "../../components/Layout";
import NotificationsRoll from "../../components/NotificationsRoll";

export default class TrainingIndexPage extends React.Component {
  render() {
    return (
      <Layout>
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
            最新通告
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <NotificationsRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
