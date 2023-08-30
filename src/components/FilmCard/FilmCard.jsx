import { Layout, Col, Rate } from 'antd'
import { Component } from 'react'

import './FilmCard.css'

const { Header, Footer, Sider, Content } = Layout

class FilmCard extends Component {
  cropDescription = () => {
    const { description } = this.props
    if (description.length > 218) {
      const descItog = description.substr(0, 218)
      return `${descItog.substr(0, descItog.lastIndexOf(' '))} ...`
    }
    return description
  }

  borderColor = () => {
    const { rating } = this.props
    const color = ['#E90000', '#E90000', '#E90000', '#E97E00', '#E97E00', '#E9D100', '#E9D100', '#66E900'].slice(
      0,
      Math.floor(rating) + 1
    )
    return color[color.length - 1]
  }

  render() {
    const { title, date, genre, rating, img, stars, handelChangeStars } = this.props
    return (
      <Col span={12} className="card">
        <Layout className="layout">
          <Sider className="siderStyle">
            <img
              className="filmCardImage"
              src={
                img !== null
                  ? `https://image.tmdb.org/t/p/original${img}`
                  : 'https://gdr.one/simg/183x281/5094bd/fff?text=No_image'
              }
              alt={title}
            />
          </Sider>
          <Layout>
            <Header className="headerStyle">
              <div className={title.length > 23 ? 'titleLongStyle' : ''}>{title}</div>
              <div style={{ border: `2px solid ${this.borderColor()}` }} className="rating">
                {rating}
              </div>
            </Header>
            <Content className="contentStyle">
              <div className="date">{date}</div>
              <div className="genre">{genre}</div>
              <div className="description">{this.cropDescription()}</div>
            </Content>
            <Footer className="footerStyle">
              <Rate
                className="star__size "
                count={10}
                allowHalf
                onChange={handelChangeStars}
                value={stars}
                allowClear={false}
              />
            </Footer>
          </Layout>
        </Layout>
      </Col>
    )
  }
}

export default FilmCard
