// import { NextApiRequest, NextApiResponse } from 'next';
// import { getPost } from '../../../service/post.service';

// export default function postsHandler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { query } = req;
//   const post = getPost(query.id as string);

//   return post
//     ? res.status(200).json(post)
//     : res.status(404).json({ message: `Posts with id: ${ query.id } not found.` });
// }

export default {}