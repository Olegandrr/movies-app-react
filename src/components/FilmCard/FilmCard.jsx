import { Layout, Col } from 'antd'

import './FilmCard.css'

const { Header, Footer, Sider, Content } = Layout

function FilmCard({ title, description, date, genre, rating, img }) {
  function cropDescription() {
    if (description.length > 218) {
      const descItog = description.substr(0, 218)
      return `${descItog.substr(0, descItog.lastIndexOf(' '))} ...`
    }
    return description
  }
  return (
    <Col span={12} className="card">
      <Layout className="layout">
        <Sider className="siderStyle">
          <img className="filmCardImage" src={`https://image.tmdb.org/t/p/original${img}`} alt={title} />
        </Sider>
        <Layout>
          <Header className="headerStyle">
            <div className={title.length > 23 && 'titleLongStyle'}>{title}</div>
            <div className="rating">{rating}</div>
          </Header>
          <Content className="contentStyle">
            <div className="date">{date}</div>
            <div className="genre">{genre}</div>
            <div className="description">{cropDescription()}</div>
          </Content>
          <Footer className="footerStyle">Star rating</Footer>
        </Layout>
      </Layout>
    </Col>
  )
}

export default FilmCard
