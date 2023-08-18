import { Layout, Col } from 'antd'

import './FilmCard.css'

const { Header, Footer, Sider, Content } = Layout

function FilmCard({ title, description, date, genre, rating }) {
  return (
    <Col span={12} className="card">
      <Layout className="layout">
        <Sider className="siderStyle">
          <img
            className="film-card__image"
            src="https://image.tmdb.org/t/p/original/xAuR564U2njKKcXSbfbq36rZLeA.jpg"
            alt="Poster"
          />
        </Sider>
        <Layout>
          <Header className="headerStyle">
            <div>{title}</div>
            <div className="rating">{rating}</div>
          </Header>
          <Content className="contentStyle">
            <div className="date">{date}</div>
            <div className="genre">{genre}</div>
            <div className="description">{description}</div>
          </Content>
          <Footer className="footerStyle">Star rating</Footer>
        </Layout>
      </Layout>
    </Col>
  )
}

export default FilmCard
