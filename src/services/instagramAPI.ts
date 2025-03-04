const access_token = process.env.NEXT_PUBLIC_KEY_API_INSTAGRAM;

export async function getInsta(url:string) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

// export async function getUserId():Promise<InstaUserId> {
//   const url = `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
//   return getInsta(url);
// }

export function getUserPosts():Promise<InstaUserPosts> {
  const url = `https://graph.instagram.com/me/media?fields=id,media_type,caption,permalink,media_url,timestamp&access_token=${access_token}`;
  return getInsta(url);
}

// export async function getPostTypeById(postId:string):Promise<InstaPostType> {
//   const url = `https://graph.instagram.com/${postId}?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`
//   return getInsta(url);
// }

// export async function getMediasByPostId(postId:string):Promise<InstaPostMediasIds> {
//   const url = `https://graph.instagram.com/${postId}/children?access_token=${access_token}`
//   return getInsta(url);
// }

// export async function getUrlByMediaId(mediaId:string):Promise<InstaMediaUrl> {
//   const url = `https://graph.instagram.com/v17.0/${mediaId}?fields=media_url&access_token=${access_token}`
//   return getInsta(url);
// }