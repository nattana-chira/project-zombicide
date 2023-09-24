import classNames from 'classnames';

export default function MapDoor({ mission, blockName, onClick }) {  
  const block = mission[blockName]
  if (!block) return null

  return block.doors.map(door => 
    <img src={door.isOpen ? "img/opened_door.png"  : "img/closed_door.png" }
      className={classNames("door hoverable", { ["rotate-" + door.rotate]: true })} 
      style={door.position} 
      alt='door' 
      onDoubleClick={() => onClick(door)}
    />
  )
}