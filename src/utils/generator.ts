import {
  getMidpoint,
  getRandomPointInsidePolygon,
  getRegularPolygonVertices,
} from '@/utils/calc';
import { drawPoint, drawPolygon } from '@/utils/draw';
import { getRandomArrayIndex } from '@/utils/misc';
import { Point, TriangleNodes } from '@/types';
import { checkers, VertexChecker } from '@/utils/vertexCheckers';

interface FractalGeneratorOptions {
  ctx: CanvasRenderingContext2D;
  n: number;
  size: number;
  color?: string;
  vertexValidation?: string;
}

const ITERATIONS = 100000;

interface VertexCheckerOptions {
  vertex: Point;
  selectedVertices: string[];
  vertices: Point[] | Point[];
  vertexValidation?: string;
}

const createVertexValidator = (vertices: TriangleNodes, vertexValidation: string | undefined) => {
  let validator: (VertexChecker) = () => () => true;
  if (vertexValidation) validator = checkers[vertexValidation];

  return validator(vertices);
};

export const generateFractal = async (options: FractalGeneratorOptions) => {
  const {
    ctx, n, size, color, vertexValidation,
  } = options;

  const vertices = getRegularPolygonVertices(n, size) as TriangleNodes;

  ctx.fillStyle = '#161a21';
  drawPolygon(ctx, vertices);
  ctx.fill();

  let lastPoint = getRandomPointInsidePolygon(vertices);
  drawPoint(ctx, lastPoint, '#40F99B');

  let lastVerticesIndices: number[] = [];

  const storeVertexIndex = (vertexIndex: number) => {
    if (lastVerticesIndices.length < 5) lastVerticesIndices.push(vertexIndex);
    else {
      lastVerticesIndices = [
        ...lastVerticesIndices.slice(1),
        vertexIndex,
      ];
    }
  };

  const isVertexCorrect = createVertexValidator(vertices, vertexValidation);

  for (let i = 0; i < ITERATIONS; i += 1) {
    let vertex = null;
    let vertexIndex = null;
    do {
      vertexIndex = getRandomArrayIndex(vertices.length);
      vertex = vertices[vertexIndex];
    } while (!isVertexCorrect(vertexIndex, lastVerticesIndices));
    storeVertexIndex(vertexIndex);

    lastPoint = getMidpoint(lastPoint, vertex) as Point;
    drawPoint(ctx, lastPoint, color ?? '#CC3F0C');
  }
};

export default {};
