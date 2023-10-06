export default function convertBytes(bytes:number) {
  let value, unit;
  
  if (bytes >= 1024 * 1024 * 1024) {
    value = (bytes / (1024 * 1024 * 1024)).toFixed(1);
    unit = 'GB';
  } else if (bytes >= 1024 * 1024) {
    value = (bytes / (1024 * 1024)).toFixed(1);
    unit = 'MB';
  } else if (bytes >= 1024) {
    value = (bytes / 1024).toFixed(1);
    unit = 'KB';
  } else {
    value = bytes;
    unit = 'bytes';
  }

  return `${value} ${unit}`;
}