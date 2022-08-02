import restify, {Request, Response, Next} from 'restify';
import errors from 'restify-errors';

let contextMap: any = {};

const contextTable = [
  {
    context: ['Hello', 'Hi'],
    message: 'Welcome to StationFive.'
  },
  {
    context: ['Goodbye', 'bye'],
    message: 'Thank you, see you around.'
  }
];

function prepareIndex() {
  contextMap = contextTable.reduce((map: any, item) => {
    const newItem = item.context.reduce((prev: any, curr) => {
      prev[curr] = item.message; 
      return prev;
    }, {});
    return Object.assign(map, newItem);
  }, {});
}

async function message(req: Request, res: Response, next: Next) {
  if (!req.body.message || !req.body.conversation_id) {
    return next(new errors.BadRequestError());
  }
  if (typeof req.body.message !== 'string' || typeof req.body.conversation_id !== 'string') {
    return next(new errors.BadRequestError());
  }

  let message = req.body.message;
  message = message.replace(',', '');
  message = message.replace('.', '');
  const words = message.split(' ');

  // Use promises to guarantee blocking call
  const match = await matchWords(words);

  res.contentType = 'json';
  res.json({
    response_id: req.body.conversation_id,
    response: match
  });
  next();
}

function matchWords(words: any) {
  return new Promise((resolve) => {
    let match;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      if (typeof contextMap[word] !== 'undefined') {
        match = contextMap[word];
        break; // stop iteration when word is matched 
      }
    }
    resolve(match);
  });
}

const server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: true }));

prepareIndex();

server.post('/message', message);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});