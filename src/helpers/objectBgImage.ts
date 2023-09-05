export default function objectBgImage(urlDB:string) {
  return {
    backgroundImage: `url(${urlDB})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
}