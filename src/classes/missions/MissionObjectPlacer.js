import { randomIdOnlyNumber } from "../Utils";

export const map1v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "190px", top: "120px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "280px", top: "305px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(90, degree),
      position: { left: doorPositon(90, degree, 170), top: "240px" }
    }
  ]
})

export const map1r = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "270px", top: "85px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "430px", top: "250px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(90, degree),
      position: { left: doorPositon(90, degree, 170), top: "0px" }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: doorPositon(90, degree, 245), top: "310px" }
    }
  ]
})

export const map2v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "450px", top: "130px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "450px", top: "310px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(90, degree),
      position: { left: doorPositon(90, degree, 175), top: "0px" }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "260px", top: doorPositon(0, degree, 313) }
    }
  ]
})

export const map2r = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "250px", top: "70px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "290px", top: "220px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(90, degree),
      position: { left: doorPositon(90, degree, 175), top: "240px" }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "240px", top: doorPositon(0, degree, 313) }
    }
  ]
})

export const map3r = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "310px", top: "450px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "210px", top: "350px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(270, degree),
      position: { left: doorPositon(270, degree, 100), top: "223px" }
    }
  ]
})

export const map3v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "110px", top: "500px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "0px", top: "310px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: "180deg",
      position: { left: "20px", top: "157px" }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: "90deg",
      position: { left: "415px", top: "230px" }
    }
  ]
})

export const map4v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "230px", top: "320px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "20px", top: "220px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(270, degree),
      position: { left: doorPositon(270, degree, 330), top: "255px" }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "10px", top: doorPositon(0, degree, 315) }
    }
  ]
})



export const map5r = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "110px", top: "330px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "290px", top: "220px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "255px", top: doorPositon(0, degree, 313) }
    }
  ]
})

export const map5v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "420px", top: "110px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "310px", top: "310px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "485px", top: doorPositon(0, degree, 313) }
    }
  ]
})

export const map6r = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "300px", top: "326px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "200px", top: "210px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "490px", top: doorPositon(0, degree, 307) }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(270, degree),
      position: { left: doorPositon(270, degree, 100), top: "237px" }
    }
  ]
})

export const map6v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "400px", top: "150px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "200px", top: "110px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "10px", top: doorPositon(0, degree, 307) }
    },
  ]
})

export const map7r = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "300px", top: "326px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "200px", top: "210px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(90, degree),
      position: { left: doorPositon(90, degree, 400), top: "237px" }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(270, degree),
      position: { left: doorPositon(270, degree, -80), top: "237px" }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "10px", top: doorPositon(0, degree, 85) }
    }
  ]
})

export const map7v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "300px", top: "456px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "200px", top: "210px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(270, degree),
      position: { left: doorPositon(270, degree, 100), top: "243px" }
    },
  ]
})

export const map8v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "450px", top: "350px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "420px", top: "210px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "280px", top: doorPositon(0, degree, 85) }
    }
  ]
})

export const map8r = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "285px", top: "270px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "40px", top: "210px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "250px", top: doorPositon(0, degree, 85) }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(0, degree),
      position: { left: "250px", top: doorPositon(0, degree, 310) }
    }
  ]
})

export const map9r = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "300px", top: "326px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "200px", top: "210px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(90, degree),
      position: { left: doorPositon(90, degree, 400), top: "237px" }
    },
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(270, degree),
      position: { left: doorPositon(270, degree, 100), top: "237px" }
    }
  ]
})

export const map9v = (degree = 0) => ({
  objectives: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "300px", top: "480px" }
    }
  ],
  epicWeapons: [
    {
      id: randomIdOnlyNumber(),
      visible: true,
      rotate: `${degree}deg`,
      position: { left: "200px", top: "450px" }
    }
  ],
  doors: [
    {
      id: randomIdOnlyNumber(),
      isOpen: false,
      rotate: doorDegree(270, degree),
      position: { left: doorPositon(270, degree, 100), top: "237px" }
    }
  ]
})

const doorDegree = (original, _new) => {
  if (_new === 0)
    return `${original}deg`

  if (original === 270 && _new === 90)
    return "90deg"

  if (original === 90 && _new === 270)
    return "270deg"

  if (original === 0 && _new === 180)
    return "180deg"

  if (original === 180 && _new === 0)
    return "0deg"

  return `${original}deg`
} 

const doorPositon = (original, _new, pixel) => {
  if (_new === 0)
    return `${pixel}px`

  if (original === 270 && _new === 90)
    return (pixel + 80) + "px"

  if (original === 90 && _new === 270)
    return (pixel - 80) + "px"

  if (original === 0 && _new === 180)
    return (pixel + 80) + "px"

  if (original === 180 && _new === 0)
    return (pixel - 80) + "px"

  return `${pixel}px`
} 

// 90 deg door // degree === 270 ? "270deg" : "90deg", left: degree === 270 ? "95px" : "175px" // left remove -80px
// 270 deg door // degree === 90 ? "90deg" : "270deg",  left: degree === 90 ? "180px" : "100px" // left add +80px

// 0 deg door // degree === 180 ? "180deg" : "0deg", top: degree === 180 ? "180px" : "100px" // top add +80px
// 180 deg door // degree === 0 ? "0deg" : "180deg", top: degree === 0 ? "20px" : "100px" // top remove -80px