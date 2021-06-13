import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../lib/schema';

let handler: (req: any, res: any) => Promise<void>;

async function getHandler() {
  if (handler) return handler;

  const apolloServer = new ApolloServer({
    introspection: true,
    schema: schema,
    context: ({ req }) => {
      const jwt = req.cookies['X-FVG-TOKEN'] || req.cookies['X-FVG-TOKEN-CORS'];
      return { token: jwt };
    },
  });
  handler = apolloServer.createHandler({ path: '/api/graphql' });

  return handler;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return (await getHandler())(req, res);
}