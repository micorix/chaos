import { Point } from '@/types';

export const drawPolygon = (ctx: CanvasRenderingContext2D, vertices: Point[]) => {
  const [vertex1, ...restVertices] = vertices;
  ctx.moveTo(...vertex1);
  ctx.beginPath();
  restVertices.forEach((vertex) => ctx.lineTo(...vertex));
  ctx.lineTo(...vertex1);
  ctx.closePath();
};

export const drawPoint = (ctx: CanvasRenderingContext2D, point: Point, color = 'white') => {
  const SIZE = 1;
  // eslint-disable-next-line no-param-reassign
  ctx.fillStyle = color;
  ctx.fillRect(point[0], point[1], SIZE, SIZE);
};

export const X = 2;
