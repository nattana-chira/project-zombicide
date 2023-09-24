import classNames from 'classnames';

export default function MapZombieSpawnPoint({ mission, blockName }) {  
  const block = mission[blockName]
  if (!block) return null

  return block.spawnPoints.map(spawnPoint => 
    <img src="img/spawn_point.png" 
    className={classNames("spawn-point hoverable", { ["rotate-" + spawnPoint.rotate]: true })} 
    style={spawnPoint.position} 
    alt='spawn-point' />
  )
}