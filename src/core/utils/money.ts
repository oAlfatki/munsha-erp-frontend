export const money = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;
