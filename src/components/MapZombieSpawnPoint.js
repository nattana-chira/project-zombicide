import classNames from 'classnames';

export default function MapZombieSpawnPoint({ mission, blockName, onClick }) {  
  const block = mission[blockName]
  if (!block) return null

  return block.spawnPoints.map(spawnPoint => 
    <img 
      id={spawnPoint.id}
      src="img/spawn_point.png" 
      className={classNames("spawn-point hoverable", { ["rotate-" + spawnPoint.rotate]: true })} 
      style={spawnPoint.position} 
      alt='spawn-point' 
      onDoubleClick={() => onClick(spawnPoint)}
    />
  )
}