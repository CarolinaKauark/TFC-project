import User from './user';

(async () => {
  const user = await User.findAll({});
  console.log(user);
  process.exit(0);
})();
