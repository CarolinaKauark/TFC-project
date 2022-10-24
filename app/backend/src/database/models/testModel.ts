import User from './user';

(async () => {
  const user = await User.findAll({ raw: true });
  console.log(user);
  process.exit(0);
})();
