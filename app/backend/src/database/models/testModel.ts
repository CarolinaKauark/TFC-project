import Matche from './matche';

(async () => {
  const user = await Matche.findAll({ raw: true });
  console.log(user);
  process.exit(0);
})();
