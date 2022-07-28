import styles from './Post.module.css'

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img src="https://github.com/ahnucl.png"/>
          <div className={styles.authorInfo}>
            <strong>Leonardo Cunha</strong>
            <span>Developer</span>
          </div>
        </div>

        
        <time dateTime="2022-07-27 16:00:00" title="27 de julho às 16:00h">Publicado a 1h</time>
      </header>

      <div className={styles.content}>
        <p>Oasndkasnd kasud as</p>
        <p>asdhbasjdasjhdgsajhdgjashd  asd asd asd asd asd asd </p>
        <p>👉{' '}<a href="">lalmcunha@gmail.com</a></p>
        <p>
          <a href="">#novoprojeto</a>{' '}
          <a href="">#nlw</a>{' '}
          <a href="">#rocketseat</a>
        </p>!
      </div>
    </article>
    )
}