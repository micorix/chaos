import { Point, TriangleNodes } from '@/types';
import { isStepsAway, serializePoint } from '@/utils/misc';

export type VertexChecker = (vertices: TriangleNodes) => (
  vertexIndex: number,
  lastVerticesIndices: number[]
) => boolean

const CANNOT_BE_PREVIOUS: VertexChecker = (vertices) => (vertexIndex, lastVerticesIndices) => {
  const lastVertexIndex = lastVerticesIndices[lastVerticesIndices.length - 1];
  const lastVertex = vertices[lastVertexIndex];
  console.log(lastVerticesIndices);
  if (!lastVertex) return true;
  return serializePoint(lastVertex) !== serializePoint(vertices[vertexIndex]);
};

const LAST_CANNOT_BE_TWO_AWAY: VertexChecker = (vertices) => (vertexIndex, lastVerticesIndices) => {
  const lastVertexIndex = lastVerticesIndices[lastVerticesIndices.length - 1];
  const lastVertex = vertices[lastVertexIndex];
  console.log(lastVerticesIndices);
  if (!lastVertex) return true;

  return !isStepsAway(2, lastVertexIndex, vertexIndex, vertices.length);
};

export const checkers: Record<string, VertexChecker> = {
  CANNOT_BE_PREVIOUS,
  LAST_CANNOT_BE_TWO_AWAY,
};
