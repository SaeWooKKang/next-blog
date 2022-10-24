const ISSUE_URL = "https://api.github.com/repos/SaeWooKKang/for-test/issues";

const token = '';

const getAllIssue = () => {
  return fetch(ISSUE_URL).then(res => res.json())
}

const getComments = async (title: string) => {
  const issues = await getAllIssue();
  const matchingIssue = issues.filter((issue: any) => issue.title.split('/')[0] == title);

  return matchingIssue;
}

const postComment = (id: string, comment: string) => {
  const title = window.location.pathname.split('/')[2];

  return fetch(ISSUE_URL, {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "token " + token,
      },
      body: JSON.stringify({
        title: title + '/' + id,
        body: comment
      }),
  });
}

const createComment = (id: string, comment: string, title: string) => {
  return postComment(id, comment).then(_ => getComments(title));
}
const getPostTitle = () => window.location.pathname.split('/')[2];

export default {
  getComments,
  createComment,
  getPostTitle
}
