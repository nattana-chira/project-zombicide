export default class Hero {
  name = null
  maxHp = 0
  
  static showName(hero) {
    return hero?.name || ""
  }
}

export const randomHero = (heroes) => {
  heroes = [...heroes].sort(() => Math.random() - 0.5)
  return heroes
}

const buildHero = (name, maxHp) => {
  return {
    name,
    maxHp
  }
}


export const initHeroes = [
  buildHero("adam", 3),
  buildHero("amy", 3),
  buildHero("belle", 3),
  buildHero("cathy", 3),
  buildHero("dan", 3),
  buildHero("derek", 3),
  buildHero("elsa", 3),
  buildHero("james", 3),
  buildHero("jane", 3),
  buildHero("jeff", 3),
  buildHero("joe", 3),
  buildHero("josh", 3),
  buildHero("julien", 3),
  buildHero("kim", 3),
  buildHero("laurie", 3),
  // buildHero("louise", 3),
  buildHero("maddie", 3),
  buildHero("ned", 3),
  buildHero("neema", 3),
  buildHero("parker", 3),
  buildHero("phil", 3),
  buildHero("raoul", 3),
  buildHero("shannon", 3),
  buildHero("wanda", 3),
]