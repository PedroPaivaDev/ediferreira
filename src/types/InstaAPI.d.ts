interface InstaUserId {
  id: string;
  username: string;
}

interface InstaUserPosts {
  data: postData[];
}

interface postData {
  caption: string;
  id: string;
  media_url: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO';
  permalink: string;
  timestamp: string;
}

interface InstaPostType {
  id: string;
  media_url: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO';
  timestamp: string;
  username: string;
}

interface InstaPostMediasIds {
  data: MediaId[];
}

interface MediaId {
  id: string;
}

interface InstaMediaUrl {
  id: string;
  media_url: string;
}