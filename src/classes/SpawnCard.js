export default class SpawnCard {
  id = null

  constructor(id) {
    this.id = id
  }
}

export const masterSpawnDeck = [
  new SpawnCard(1),
  new SpawnCard(2),
  new SpawnCard(3),
  new SpawnCard(4),
  new SpawnCard(5),
  new SpawnCard(6),
  new SpawnCard(7),
  new SpawnCard(8),
  new SpawnCard(9),
  new SpawnCard(10),
  new SpawnCard(11),
  new SpawnCard(12),
  new SpawnCard(13),
  new SpawnCard(14),
  new SpawnCard(15),
  new SpawnCard(16),
  new SpawnCard(17),
  new SpawnCard(18),
  new SpawnCard(19),
  new SpawnCard(20),
  new SpawnCard(21),
  new SpawnCard(22),
  new SpawnCard(23),
  new SpawnCard(24),
  new SpawnCard(25),
  new SpawnCard(26),
  new SpawnCard(27),
  new SpawnCard(28),
  new SpawnCard(29),
  new SpawnCard(30),
  new SpawnCard(31),
  new SpawnCard(32),
  new SpawnCard(33),
  new SpawnCard(34),
  new SpawnCard(35),
  new SpawnCard(36),
  new SpawnCard(37),
  new SpawnCard(38),
  new SpawnCard(39),
  new SpawnCard(40),
]

export const mapSpawnDeck = (cardId) => masterSpawnDeck.find(card => card.id === cardId)

export const initSpawnDeck = masterSpawnDeck.map((card) => card.id)
