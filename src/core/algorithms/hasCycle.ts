const VISITING = 1
const VISITED = 2

/**
 * @function hasCycle
 * @param {any} graph - An adjacency list representation of a graph.
 * @returns {boolean} True if the graph contains a cycle, false otherwise.
 * @description Detects whether a cycle exists in the given directed graph using Depth First Search (DFS).
 */
export function hasCycle(graph: any): boolean {
    const states = new Map<string, number>()

    for (const vertex of Object.keys(graph)) {
        if (!states.has(vertex)) {
            if (dfs(vertex, graph, states)) return true
        }
    }

    return false
}

/**
 * @function dfs
 * @param {string} vertex - The current vertex being visited.
 * @param {any} graph - The graph represented as an adjacency list.
 * @param {Map<string, number>} states - A map to track the state of each vertex during DFS (VISITING, VISITED).
 * @returns {boolean} True if a cycle is detected during the DFS traversal, false otherwise.
 * @description Performs a Depth First Search (DFS) traversal to detect cycles in the graph.
 */
function dfs(vertex: string, graph: any, states: Map<string, number>): boolean {
    states.set(vertex, VISITING)

    const neighbors = graph[vertex]
    if (neighbors) {
        for (const neighbor of neighbors) {
            const state = states.get(neighbor)
            if (state === VISITING) {
                return true
            }
            if (state === undefined && dfs(neighbor, graph, states)) {
                return true
            }
        }
    }

    states.set(vertex, VISITED)

    return false
}
