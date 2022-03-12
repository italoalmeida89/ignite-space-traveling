import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../components/Header';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const posts = [
  {
    uid: 'sdfsdf',
    first_publication_date: '07/04/2021',
    data: {
      title: 'Título',
      subtitle: 'Subtitulo ',
      author: 'Autor',
      readTime: '5'
    }
  },
  {
    uid: 'sdfsdf',
    first_publication_date: '07/04/2021',
    data: {
      title: 'Título',
      subtitle: 'Subtitulo ',
      author: 'Autor',
      readTime: '5'
    }
  },
  {
    uid: 'sdfsdf',
    first_publication_date: '07/04/2021',
    data: {
      title: 'Título',
      subtitle: 'Subtitulo ',
      author: 'Autor',
      readTime: '5'
    }
  }
]

export default function Home() {
  // TODO
  return (
    <>
      <Head>
        <title>Home | Space Traveling</title>
      </Head>

      <Header />

      <main className={commonStyles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <div key={post.uid} className={styles.posts} >
              <Link href={`/post/${post.uid}`}>
                <a>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
                  <ul>
                    <li>
                      <FiCalendar />{post.first_publication_date}
                    </li>
                    <li>
                      <FiUser />{post.data.author}
                    </li>
                    <li>
                      <FiClock />{`${post.data.readTime} min`}
                    </li>
                  </ul>
                </a>
              </Link>
            </div>
          ))}
        </div>

        <button type="button">
          Carregar mais posts
        </button>

      </main>
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
