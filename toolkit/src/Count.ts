import { showToast } from '@copywise/api';

export default async ({ data }) => {
  const text = data || '';
  
  // Count characters (including spaces)
  const charCount = text.length;
  
  // Count characters (excluding spaces)
  const charNoSpaceCount = text.replace(/\s/g, '').length;
  
  // Format the message
  let message;
  if (charCount === charNoSpaceCount) {
    message = `Characters: ${charCount}`;
  } else {
    message = `Characters (with spaces): ${charCount}\nCharacters (no spaces): ${charNoSpaceCount}`;
  }
  
  showToast({
    title: 'Count Words',
    message: message,
    status: 'success'
  });
}
