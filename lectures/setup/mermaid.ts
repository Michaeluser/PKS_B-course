// Makes the ELK layout available to Mermaid. It is used only by diagrams that opt in
// with `config: layout: elk` in their frontmatter; the default layout stays dagre.
// Loaded lazily on the first diagram render, on the same Mermaid bundle Slidev uses.
let registered = false

export default async () => {
  if (!registered) {
    const [{ default: mermaid }, { default: elkLayouts }] = await Promise.all([
      import('mermaid/dist/mermaid.esm.mjs'),
      import('@mermaid-js/layout-elk'),
    ])
    mermaid.registerLayoutLoaders(elkLayouts)
    registered = true
  }
  // Only affects diagrams using the ELK layout: keep states in the order they are written
  return {
    elk: {
      cycleBreakingStrategy: 'MODEL_ORDER',
      considerModelOrder: 'NODES_AND_EDGES',
    },
  }
}
