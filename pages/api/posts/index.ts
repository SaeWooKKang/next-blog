import { NextApiResponse, NextApiRequest } from 'next';
import { getPostNames } from '../../../service/post.service';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const postNames = getPostNames();
  
  return postNames
    ? res.status(200).json(postNames)
    : res.status(404).json({ message: `Posts not found.` });
}
