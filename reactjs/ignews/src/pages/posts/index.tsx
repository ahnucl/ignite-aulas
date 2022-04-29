import Head from 'next/head'
import styles from './styles.module.scss'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>29 de abril de 2022</time>
            <strong>Título do post em si</strong>
            <p>Muitas coisas aconteciam simultaneamente no mundo durante a década de 70, principalmente na tecnologia: basta dizer que o primeiro email foi enviado em 1971, por Ray Tomlinson. O que aconteceu também foi a estreia da sketch televisa de humor, Monty Python’s Flying Circus, na BBC britânica, em 1969. Esse pequeno evento televisivo influenciou gerações, incluindo — sim — programadores.</p>
          </a>
          <a href="">
            <time>29 de abril de 2022</time>
            <strong>Título do post em si</strong>
            <p>Muitas coisas aconteciam simultaneamente no mundo durante a década de 70, principalmente na tecnologia: basta dizer que o primeiro email foi enviado em 1971, por Ray Tomlinson. O que aconteceu também foi a estreia da sketch televisa de humor, Monty Python’s Flying Circus, na BBC britânica, em 1969. Esse pequeno evento televisivo influenciou gerações, incluindo — sim — programadores.</p>
          </a>
          <a href="">
            <time>29 de abril de 2022</time>
            <strong>Título do post em si</strong>
            <p>Muitas coisas aconteciam simultaneamente no mundo durante a década de 70, principalmente na tecnologia: basta dizer que o primeiro email foi enviado em 1971, por Ray Tomlinson. O que aconteceu também foi a estreia da sketch televisa de humor, Monty Python’s Flying Circus, na BBC britânica, em 1969. Esse pequeno evento televisivo influenciou gerações, incluindo — sim — programadores.</p>
          </a>
        </div>
      </main>
    </>
  )
}