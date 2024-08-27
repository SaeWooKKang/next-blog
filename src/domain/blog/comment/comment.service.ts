export const createCommentsScript = () => {
  const $script = document.createElement('script');

  $script.src = 'https://utteranc.es/client.js';
  $script.async = true;
  $script.crossOrigin = 'anonymous';

  $script.setAttribute('repo', 'SaeWooKKang/for-comments');
  $script.setAttribute('issue-term', 'title');
  $script.setAttribute('theme', 'preferred-color-scheme');
  $script.setAttribute('label', 'Comment');

  return $script;
};
