import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Prismic from '@prismicio/client';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { calcReadTime } from '../../utils';
interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    readTime: number;
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

export default function Post({ post }: PostProps) {

  return (
    <>
      <Head>
        <title>{post.data?.title} | Space Traveling</title>
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
              <FiClock /> {`${post.data.readTime} min`}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts'),
  ]);

  const paths = posts.results.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      readTime: calcReadTime(response.data.content),
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
  };
};
