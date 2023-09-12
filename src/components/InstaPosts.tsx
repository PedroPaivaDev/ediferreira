import React from 'react';
import Image from 'next/image';

import { getPostTypeById, getUserPosts } from '@/services/instagramAPI';


const InstaPosts = () => {
  const [instaPosts, setInstaPosts] = React.useState<PostsArray>([]);
  const maxNumberOfPosts:number = 3;

  function hideText(text:string, maxLength:number) {
    if(text.length <= maxLength) {
      return text;
    }
    return text.slice(0,maxLength) + '...';
  }

  React.useEffect(() => {
    async function fetchInstaPosts() {
      try {
        const userPosts = await getUserPosts();
        const posts:PostsArray = [];

        await Promise.all(
          userPosts.data.map(async (post) => {
            const resolve = await getPostTypeById(post.id);

            if (resolve.media_type !== 'VIDEO') {
              const timestamp = Date.parse(resolve.timestamp);
              const description = post.caption;

              posts.push({
                id: timestamp,
                imageUrl: resolve.media_url,
                description,
              });
            }
          })
        );

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
      <h2>Ultimos posts do Instagram</h2>
      <div className='flex flex-wrap flex-col sm:flex-row justify-center items-center gap-10'>
        {instaPosts && instaPosts.slice(0,maxNumberOfPosts).map(post =>
          <div key={post.id}
            className='flex flex-col justify-center items-center max-w-[300px] cursor-pointer group'
          >
            <Image
              src={post.imageUrl}
              width={200}
              height={200}
              alt='Post Insta'
              className='rounded-full h-[200px] shadow-lg group-hover:shadow-2xl duration-300'
              />
            <p className='max-w-[200px] whitespace-break-spaces'>
              { hideText(post.description, 30) }
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default InstaPosts;