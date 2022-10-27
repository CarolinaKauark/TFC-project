import Match from './match';

(async () => {
  const user = await Match.findAll({ raw: true });
  console.log(user);
  process.exit(0);
})();
