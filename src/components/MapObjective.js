import classNames from 'classnames';

export default function MapObjective({ mission, blockName, onClick }) {  
  const block = mission[blockName]
  if (!block) return null

  return block.objectives.map(objective => 
    <img src="img/objective.png" 
      // onClick={() => onClick(objective)}
      onDoubleClick={() => onClick(objective)}
      className={classNames("objective hoverable", { ["rotate-" + objective.rotate]: true })} 
      style={objective.position} 
      alt='objective' />
  )
}