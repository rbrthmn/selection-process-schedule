const VISITING = 1
const VISITED = 2

export function hasCycle(graph: any): boolean {
    const states = new Map<string, number>()

    for (const vertex of Object.keys(graph)) {
        if (!states.has(vertex)) {
            if (dfs(vertex, graph, states)) return true
        }
    }

    return false
}

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
