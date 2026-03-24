/**
 * tuple [incomingPathWeight, totalPathWeight]
 * - incomingPathWeight: The maximum accumulated weight from the start of the graph to this vertex (excluding vertex weight).
 * - totalPathWeight: The maximum accumulated weight including this vertex's weight.
 */
type VertexWeights = [incoming: number, total: number];

/**
 * @function calculatePathWeights
 * @description Calculates the longest path weights for each vertex in the graph.
 * It traverses the graph to determine the accumulated weight reaching each vertex
 * and the total accumulated weight, including the vertex's own weight.
 *
 * @param {Record<number, Record<number, number | null>>} graph - The adjacency matrix where:
 *   - graph[target][source] represents the weight of the edge from source to target.
 *   - graph[target][target] represents the weight of the vertex itself.
 *
 * @returns {Record<number, VertexWeights>} A record where the key is the vertex ID and the value is the VertexWeights tuple.
 */
export function calculatePathWeights(
    graph: Record<number, Record<number, number | null>>
): Record<number, VertexWeights> {
    const result: Record<number, VertexWeights> = {};

    Object.keys(graph).forEach(vertexStr => {
        dfs(Number(vertexStr), graph, result);
    });

    return result;
}

function dfs(
    vertex: number,
    graph: Record<number, Record<number, number | null>>,
    result: Record<number, VertexWeights>
): void {
    if (result[vertex]) return;

    let maxIncomingWeight = 0;

    const predecessors = graph[vertex];
    if (predecessors) {
        Object.keys(predecessors).forEach((predecessorStr) => {
            const predecessor = Number(predecessorStr);
            const edgeWeight = predecessors[predecessor];

            if (predecessor === vertex || edgeWeight === null) return;

            dfs(predecessor, graph, result);

            const [, predecessorTotalWeight] = result[predecessor];
            const candidateWeight = predecessorTotalWeight + edgeWeight;

            if (candidateWeight > maxIncomingWeight) {
                maxIncomingWeight = candidateWeight;
            }
        });
    }

    const vertexWeight = graph[vertex]?.[vertex] ?? 0;
    const totalWeight = maxIncomingWeight + vertexWeight;

    result[vertex] = [maxIncomingWeight, totalWeight];
}
