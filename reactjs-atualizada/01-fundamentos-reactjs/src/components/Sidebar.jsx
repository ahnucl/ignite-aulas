import { PencilSimpleLine } from "phosphor-react";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* Unsplash, alrgura max 500px, qualidade 50% pra menos */}
      <img 
        className={styles.cover}
        src="https://images.unsplash.com/photo-1658763440414-07d3b9c42bb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
      />
      <div className={styles.profile}>
        <img src="https://github.com/ahnucl.png" className={styles.avatar}/>
        <strong>Leonardo Cunha</strong>
        <span>Developer</span>
      </div>

      <footer>
        <a href="">
          <PencilSimpleLine size={20}/>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}