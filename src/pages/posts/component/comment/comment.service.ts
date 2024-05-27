import { Config } from './types';

const ISSUE_URL = 'https://api.github.com/repos/SaeWooKKang/for-test/issues';

const getAllIssue = () => fetch(ISSUE_URL).then((res) => res.json());

const getComments = async (title: string) => {
  const issues = await getAllIssue();
  const matchingIssue = issues.filter(
    (issue: any) => issue.title.split('/')[0] === title,
  );

  return matchingIssue;
};

const postComment = async (config: Config) => {
  const { title, id, comment } = config;

  const response = await fetch(ISSUE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${process.env.NEXT_PUBLIC_GIT_TOKEN}`,
    },
    body: JSON.stringify({
      title: `${title}/${id}`,
      body: comment,
    }),
  });

  if (!response.ok) {
    alert('요청에 실패했습니다. 잠시후 다시 시도해주세요.');
    console.error('에러가 발생했습니다.');
  }
  return response;
};

const createComment = (config: Config) => postComment(config);

const getPostTitle = () => decodeURI(window.location.pathname.split('/')[2]);

export default {
  getComments,
  createComment,
  getPostTitle,
};
