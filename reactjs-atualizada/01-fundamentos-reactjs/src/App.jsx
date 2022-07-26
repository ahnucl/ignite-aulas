import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post } from "./post"

import styles from './App.module.css'

import './global.css'

export function App() {
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post 
            author="Leonardo"
            content="as dajdlasj dashdj landa"
          />
          <Post 
            author="Leonardo"
            content="as dajdlasj dashdj landa"
          />
        </main>
      </div>

      
    </div>
  )
}
