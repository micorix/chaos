import { Point, TriangleNodes } from '@/types';
import earcut from 'earcut';
import { getRandomArrayIndex } from '@/utils/misc';
import { drawPoint, drawPolygon } from '@/utils/draw';

const getEquilateralTriangleHeight = (a: number) => (Math.sqrt(3) * a) / 2;

export const getRegularPolygonVertices = (n: number, size: number, center: Point = [0, 0]) => {
  const [centerX, centerY] = center;
  const vertices = [];
  for (let i = 1; i <= n; i += 1) {
    vertices.push([
      centerX + size * Math.cos((i * 2 * Math.PI) / n),
      centerY + size * Math.sin((i * 2 * Math.PI) / n),
    ]);
  }
  return vertices;
};

export const triangulate = (points: Point[]) => {
  const flatPoints = points.flat();
  const indices = earcut(flatPoints);
  const triangles = [];
  for (let i = 0; i < indices.length; i += 3) {
    const triangleIndices = [indices[i], indices[i + 1], indices[i + 2]];
    triangles.push(
      triangleIndices.map((index: number): Point => {
        const x = flatPoints[index * 2];
        const y = flatPoints[index * 2 + 1];
        return [x, y];
      }),
    );
  }
  return triangles;
};

export const getTriangleAreaFromVertices = (vertices: [Point, Point, Point]) => {
  const [v1, v2, v3] = vertices;
  return Math.abs(
    (v1[0] * (v2[1] - v3[1]) + v2[0] * (v3[1] - v1[0]) + v3[0] * (v1[0] - v2[1])) / 2,
  );
};

export const getRandomPointInsideTriangle = (nodes: TriangleNodes): Point => {
  const [n1, n2, n3] = nodes;

  const rand = Math.random();
  const sq = Math.sqrt(Math.random());

  const x = n1[0] * (1.0 - sq) + n2[0] * (1.0 - rand) * sq + n3[0] * rand * sq;
  const y = n1[1] * (1.0 - sq) + n2[1] * (1.0 - rand) * sq + n3[1] * rand * sq;

  return [x, y];
};

export const getMidpoint = (p1: Point, p2: Point) => [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];

export const getWeights = (numbers: number[]) => {
  const sum = numbers.reduce((prev, curr) => prev + curr);
  return numbers.map((num) => num / sum);
};

export const createWeightedRandomIndexGenerator = (weights: number[]) => {
  const arr: number[] = [];

  weights.forEach((weight, weightIndex) => {
    for (let i = 0; i < weight * 10; i += 1) {
      arr.push(weightIndex);
    }
  });

  return () => arr[getRandomArrayIndex(arr.length)];
};

export const getRandomPointInsidePolygon = (vertices: Point[]) => {
  if (vertices.length === 3) return getRandomPointInsideTriangle(vertices as TriangleNodes);

  const triangles = triangulate(vertices) as TriangleNodes[];

  const areas = triangles.map((triangle: TriangleNodes) => getTriangleAreaFromVertices(triangle));
  const weights = getWeights(areas);
  const getWeightedRandomIndex = createWeightedRandomIndexGenerator(weights);

  const randomTriangleIndex = getWeightedRandomIndex();
  const randomTriangle = triangles[randomTriangleIndex];
  return getRandomPointInsideTriangle(randomTriangle);
};
