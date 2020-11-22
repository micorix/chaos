import { Point } from '@/types';

export const getRandomArrayIndex = (length: number) => Math.floor(Math.random() * length);

export const serializePoint = (p: Point) => `${p[0]}-${p[1]}`;

export const isStepsAway = (
  steps: number, currIndex: number, desiredIndex: number, arrayLength: number,
) => {
  if (currIndex + steps === desiredIndex || currIndex - steps === desiredIndex) return true;

  const toEnd = arrayLength - 1 - currIndex;
  return steps - toEnd === desiredIndex || arrayLength - (currIndex + 1) === desiredIndex;
};
