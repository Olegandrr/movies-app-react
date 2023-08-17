import { Layout } from 'antd'

import './FilmCard.css'

const { Header, Footer, Sider, Content } = Layout

function FilmCard() {
  return (
    <div className="card">
      <Layout className="layout">
        <Sider className="siderStyle">Sider</Sider>
        <Layout>
          <Header className="headerStyle">
            <div>Header</div>
            <div className="rating">6.6</div>
          </Header>
          <Content className="contentStyle">
            <div className="date">Date</div>
            <div className="genre">Genre</div>
            <div className="description">
              `A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
              attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...`
            </div>
          </Content>
          <Footer className="footerStyle">Footer</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default FilmCard
