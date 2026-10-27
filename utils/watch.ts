export const NIGHT_START = 18;
export const NIGHT_END = 6;
export function isNightWatch(hour:number){return hour>=NIGHT_START||hour<NIGHT_END;}
