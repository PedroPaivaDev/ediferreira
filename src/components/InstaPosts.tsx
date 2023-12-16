import React from 'react';
import Link from 'next/link';

// import { getUserPosts } from '@/services/instagramAPI';

const instaPosts:PostsArray = [
  {
    id: 1,
    description: '',
    href: 'https://www.instagram.com/p/C0wSSlhgmTx/?img_index=1',
    imageUrl: 'https://instagram.fplu34-1.fna.fbcdn.net/v/t39.30808-6/410067449_17861968080060676_477974354886915955_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyIn0&_nc_ht=instagram.fplu34-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Me2ydgnWAMIAX8bpebm&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI1NjE4Mjk2NTMwMjE3NTg0OA%3D%3D.2-ccb7-5&oh=00_AfCY77d5IHZrmnwvLr7IWJqCXmtplCOI4snFI_Re4IPHNA&oe=6582F102&_nc_sid=ee9879'
  },
  {
    id: 2,
    description: '',
    href: 'https://www.instagram.com/p/C0O03isA8On/?img_index=1',
    imageUrl: 'https://instagram.fplu34-1.fna.fbcdn.net/v/t39.30808-6/405236832_17860029147060676_407850334403026442_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyIn0&_nc_ht=instagram.fplu34-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=PPcdDL0vEVcAX8A2RnP&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI0Njc2NDg5MzE5MzQ4NTYzOA%3D%3D.2-ccb7-5&oh=00_AfDGYKta7PbYbNKgDFCjZmp50-R9IkqYtErHUvNKITt4YA&oe=65825126&_nc_sid=ee9879'
  },
  {
    id: 3,
    description: '',
    href: 'https://www.instagram.com/p/Cz8p22AAzLZ/?img_index=1',
    imageUrl: 'https://instagram.fplu34-1.fna.fbcdn.net/v/t39.30808-6/403194903_17858908461060676_7991821190976326505_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyIn0&_nc_ht=instagram.fplu34-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=5n0EUggIvPkAX9D1er9&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI0MTY0OTkxNDY5Mzk4Njg4OQ%3D%3D.2-ccb7-5&oh=00_AfCx9VGDxsCScK5Fz3kK6mseH528ez0xZFBrdGsrwndrDg&oe=65827A69&_nc_sid=ee9879'
  }
]

const InstaPosts = () => {
  // const [instaPosts, setInstaPosts] = React.useState<PostsArray>([]);
  const maxNumberOfPosts:number = 3;

  // function hideText(text:string, maxLength:number) {
  //   if(text.length <= maxLength) {
  //     return text;
  //   }
  //   return text.slice(0,maxLength).replace(/\n/g, '') + '...';
  // }

  // React.useEffect(() => {
  //   async function fetchInstaPosts() {
  //     try {
  //       const userPosts = await getUserPosts();
  //       const posts:PostsArray = [];

  //       userPosts.data.slice(0,15).map(post => {
  //         if(post.media_type !== 'VIDEO') {
  //           posts.push({
  //             href: post.permalink,
  //             id: Date.parse(post.timestamp),
  //             imageUrl: post.media_url,
  //             description: post.caption,
  //           });
  //         }
  //       })

  //       posts.sort((a, b) => b.id - a.id);

  //       setInstaPosts(posts.slice(0, maxNumberOfPosts));
  //     } catch (error) {
  //       console.error('Erro ao buscar posts do Instagram:', error);
  //     }
  //   }

  //   fetchInstaPosts();
  // }, []);

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
            {/* <span className='max-w-[200px] whitespace-break-spaces group-hover:text-mood-primary duration-300'>
              { hideText(post.description, 30) }
            </span> */}
          </Link>
        )}
      </div>
    </section>
  )
}

export default InstaPosts;