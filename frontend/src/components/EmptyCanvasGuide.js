import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector = (s) => ({
  nodes: s.nodes,
  addNode: s.addNode,
  onConnect: s.onConnect,
  getNodeID: s.getNodeID,
});

export const EmptyCanvasGuide = () => {
  const { nodes, addNode, onConnect, getNodeID } = useStore(selector, shallow);

  if (nodes.length > 0) return null;

  const loadSample = () => {
    const types = ['customInput', 'text', 'llm', 'customOutput'];
    const positions = [
      { x: 80, y: 200 },
      { x: 340, y: 180 },
      { x: 600, y: 200 },
      { x: 860, y: 200 },
    ];
    const ids = types.map((type, i) => {
      const id = getNodeID(type);
      addNode({ id, type, position: positions[i], data: { id, nodeType: type } });
      return id;
    });

    setTimeout(() => {
      onConnect({
        source: ids[0],
        sourceHandle: `${ids[0]}-value`,
        target: ids[1],
        targetHandle: `${ids[1]}-var-input`,
      });
      onConnect({
        source: ids[1],
        sourceHandle: `${ids[1]}-output`,
        target: ids[2],
        targetHandle: `${ids[2]}-prompt`,
      });
      onConnect({
        source: ids[2],
        sourceHandle: `${ids[2]}-response`,
        target: ids[3],
        targetHandle: `${ids[3]}-value`,
      });
    }, 50);
  };

  return (
    <div className="empty-canvas-guide">
      <div className="empty-canvas-guide__card">
        <h3>Your canvas is empty</h3>
        <p>Drag a node from the toolbar to start, or try a sample pipeline.</p>
        <button className="empty-canvas-guide__btn" onClick={loadSample}>
          Try Sample Flow
        </button>
      </div>
    </div>
  );
};
