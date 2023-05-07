import { Layout as AntLayout } from 'antd'
import styles from './index.module.css'
import { Header } from '../Header'
import { Footer } from '../Footer'

type PropsLayout = {
  children: React.ReactNode
}

export const Layout = ({ children }: PropsLayout) => {
  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.main_wrap}>
        <AntLayout.Content style={{ height: '100%' }}>{children}</AntLayout.Content>
      </main>
      <Footer />
    </div>
  )
}
