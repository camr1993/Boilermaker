const { green, red } = require('chalk');
const { db, User, Puppy, Kitten } = require('./server/db/index.js');

const seed = async () => {
  try {
    await db.sync({ force: true });

    const user1 = await User.create({
      email: 'person1@email.com',
      password: '123',
    });
    const user2 = await User.create({
      email: 'person2@email.com',
      password: '123',
    });

    await Puppy.create({
      name: 'Scooter',
      userId: user2.id,
    });
    await Puppy.create({
      name: 'Rover',
      userId: user1.id,
    });
    await Kitten.create({
      name: 'Ravioli',
      userId: user2.id,
    });
    await Kitten.create({
      name: 'Meatloaf',
      userId: user1.id,
    });
    console.log(green('Seeding Success!'));
    db.close();
  } catch (error) {
    console.error(red('SEED ERROR!!!'));
    db.close();
  }
};

seed();
