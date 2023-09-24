import classNames from 'classnames';

export default function MapEpicWeapon({ mission, blockName, onClick }) {  
  const block = mission[blockName]
  if (!block) return null

  return block.epicWeapons.map(epicWeapon => 
    <img src="img/epic_weapon.png" 
    className={classNames("epic-weapons hoverable", { ["rotate-" + epicWeapon.rotate]: true })} 
    style={epicWeapon.position} 
    onDoubleClick={() => onClick(epicWeapon)}
    alt='epic_weapons' />
  )
}