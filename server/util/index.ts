function backgroundRange() : number[] {
    return Array(5).fill(1).map((x, y) => x + y)
}

function headRange() : number[] {
    return Array(5).fill(1).map((x, y) => x + y)
}

function legsRange() : number[] {
    return Array(5).fill(1).map((x, y) => x + y)
}

function torsoRange() : number[] {
    return Array(10).fill(1).map((x, y) => x + y)
}

function head(index: number) : string {
    return `/images/head/monster_head_${index}.png`
}

function legs(index: number) : string {
    return `/images/legs/monster_legs_${index}.png`
}

function torso(index: number) : string {
    return `/images/torso/monster_torso_${index}.png`
}

function background(index: number) : string {
    return `/images/background/bg_${index}.png`
}

export {
    head,
    legs,
    torso,
    background,
    backgroundRange,
    headRange,
    legsRange,
    torsoRange,
}