function alienOrder(words: string[]): string {
    if (words.length === 0) {
        return "";
    }

    type Vertex = string;
    type VertexSet = Set<Vertex>;

    const vertices = new Set<Vertex>();
    const edges = new Map<Vertex, VertexSet>();

    for (let i = 0; i < words.length - 1; i++) {
        const lWord = words[i];
        const rWord = words[i + 1];
        let j = 0;
        let difference = false;
        for (; j < Math.min(lWord.length, rWord.length); j++) {
            const lChar = lWord[j];
            const rChar = rWord[j];

            vertices.add(lChar);

            if (lChar !== rChar) {
                difference = true;

                if (!edges.has(lChar)) {
                    edges.set(lChar, new Set<Vertex>());
                }

                edges.get(lChar)!.add(rChar);
                break;
            }
        }

        // Invalid order!
        if (!difference && lWord.length > rWord.length) {
            return "";
        }

        // Finish adding the rest of the vertices we might have missed
        while (j < lWord.length) {
            vertices.add(lWord[j]);
            j++;
        }
    }

    // Add all the vertices of the last word
    for (const char of words[words.length - 1]) {
        vertices.add(char);
    }

    // Top sort
    let totalOrder = "";

    function dfs(vertex: Vertex, cycle = new Set<Vertex>()) {
        if (cycle.has(vertex)) {
            throw new Error();
        }
        cycle.add(vertex);

        if (!vertices.has(vertex)) {
            return;
        }

        for (const neighbor of edges.get(vertex) || []) {
            dfs(neighbor, cycle);
        }

        vertices.delete(vertex);
        cycle.delete(vertex);
        totalOrder += vertex;
    }

    for (const vertex of vertices) {
        try {
            dfs(vertex);
        } catch (err) {
            // Cycle detected
            return "";
        }
    }

    return totalOrder.split("").reverse().join("");
}
