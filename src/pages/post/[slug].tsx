import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

const post = {
  first_publication_date: '07/04/2021',
  data: {
    title: 'Título',
    banner: {
      url: 'string',
    },
    author: 'Autor',
    content: [{
      heading: 'Subtitulo',
      body: [{
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra, leo at viverra ornare, mauris eros fermentum purus, ac vehicula lacus felis et tellus. In luctus sem lectus, ac dignissim est rhoncus et. Praesent nisl lacus, dapibus quis lectus vel, commodo varius ipsum. Sed at dui ut mi vestibulum aliquet.',
      }],
    }],
  },
} as Post


export default function Post() {

  return (
    <>
      <Head>
        <title>{post.data.title} | Space Traveling</title>
      </Head>

      <Header />

      <img src={post.data.banner.url} alt="imagem" className={styles.banner} />

      <main className={commonStyles.container}>
        <div className={styles.post}>
          <h1>{post.data.title}</h1>
          <ul>
            <li>
              <FiCalendar /> {post.first_publication_date}
            </li>
            <li>
              <FiUser />{post.data.author}
            </li>
            <li>
              <FiClock /> 5 min
            </li>
          </ul>


          {post.data.content.map(content => {
            return (
              <article >
                <h2>{content.heading}</h2>

                {content.body[0].text}
              </article>
            );
          })}
        </div>
      </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
