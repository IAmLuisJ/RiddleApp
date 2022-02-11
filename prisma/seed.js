import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

//seed function adds mock data to the database

async function seed() {
  //creates an object under the user model
const fakeUser = await db.user.create({
  data: {
    username: "Faker",
    passwordHash: "lkjsdfkjhsdkjbzxdkd39234lknsd"
  }
})

//once the seed function completes, calls getjokes function and creates joke objects under the joke model
  await Promise.all(
    getJokes().map(joke => {
      //add userID to the joke data returned from getjokes
      const data = { jokesterId: fakeUser.id, ...joke }
      return db.joke.create({ data });
    })
  );
}

seed();

function getJokes() {

  return [
    {
      name: "Road worker",
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`
    },
    {
      name: "Frisbee",
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`
    },
    {
      name: "Trees",
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`
    },
    {
      name: "Skeletons",
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`
    },
    {
      name: "Hippos",
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`
    },
    {
      name: "Dinner",
      content: `What did one plate say to the other plate? Dinner is on me!`
    },
    {
      name: "Elevator",
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`
    }
  ];
}