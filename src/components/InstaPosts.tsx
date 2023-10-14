import React from 'react';
import Link from 'next/link';

import { getUserPosts } from '@/services/instagramAPI';

const InstaPosts = () => {
  const [instaPosts, setInstaPosts] = React.useState<PostsArray>([]);
  const maxNumberOfPosts:number = 3;

  function hideText(text:string, maxLength:number) {
    if(text.length <= maxLength) {
      return text;
    }
    return text.slice(0,maxLength).replace(/\n/g, '') + '...';
  }

  React.useEffect(() => {
    async function fetchInstaPosts() {
      try {
        const userPosts = await getUserPosts();
        const posts:PostsArray = [];

        userPosts.data.slice(0,8).map(post => {
          if(post.media_type !== 'VIDEO') {
            posts.push({
              href: post.permalink,
              id: Date.parse(post.timestamp),
              imageUrl: post.media_url,
              description: post.caption,
            });
          }
        })

        posts.sort((a, b) => b.id - a.id);

        setInstaPosts(posts.slice(0, maxNumberOfPosts));
      } catch (error) {
        console.error('Erro ao buscar posts do Instagram:', error);
      }
    }

    fetchInstaPosts();
  }, []);

  return (
    <section className='gap-5'>
      <h2>Últimas postagens do Instagram</h2>
      <div className='flex flex-wrap flex-col sm:flex-row justify-center items-center gap-10'>
        {instaPosts && instaPosts.slice(0,maxNumberOfPosts).map(post =>
          <Link href={post.href} key={post.id} target='_blank'
            className='flex flex-col justify-center items-center max-w-[300px] cursor-pointer group text-mood-secondary font-normal'
          >
            <img
              src={post.imageUrl}
              alt={`${post.id}`}
              className='rounded-full h-52 w-52 shadow-lg group-hover:shadow-2xl duration-300'
            />
            <span className='max-w-[200px] whitespace-break-spaces group-hover:text-mood-primary duration-300'>
              { hideText(post.description, 30) }
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}

export default InstaPosts;