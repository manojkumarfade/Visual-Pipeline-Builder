import { DraggableNode } from './draggableNode';
import { ThemeToggle } from './components/ThemeToggle';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const iconProps = {
  width: '18',
  height: '18',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const NodeIcon = ({ type }) => {
  switch (type) {
    case 'customInput':
      return (
        <svg {...iconProps}>
          <path d="M4 12h12" />
          <path d="m12 8 4 4-4 4" />
          <path d="M20 5v14" />
        </svg>
      );
    case 'customOutput':
      return (
        <svg {...iconProps}>
          <path d="M8 12h12" />
          <path d="m16 8 4 4-4 4" />
          <path d="M4 5v14" />
        </svg>
      );
    case 'llm':
      return (
        <svg {...iconProps}>
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
        </svg>
      );
    case 'text':
      return (
        <svg {...iconProps}>
          <path d="M4 7h16" />
          <path d="M9 7v10" />
          <path d="M15 7v10" />
          <path d="M7 17h10" />
        </svg>
      );
    case 'prompt':
      return (
        <svg {...iconProps}>
          <path d="M5 5h14v10H8l-3 3V5z" />
          <path d="M8 9h8" />
          <path d="M8 12h5" />
        </svg>
      );
    case 'file':
      return (
        <svg {...iconProps}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case 'api':
      return (
        <svg {...iconProps}>
          <path d="M8 9 4 12l4 3" />
          <path d="m16 9 4 3-4 3" />
          <path d="m14 5-4 14" />
        </svg>
      );
    case 'transform':
      return (
        <svg {...iconProps}>
          <path d="M4 7h10" />
          <path d="m11 4 3 3-3 3" />
          <path d="M20 17H10" />
          <path d="m13 14-3 3 3 3" />
        </svg>
      );
    case 'condition':
      return (
        <svg {...iconProps}>
          <path d="M12 3 3 12l9 9 9-9-9-9z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      );
    default:
      return null;
  }
};

const nodeList = [
  { type: 'customInput', label: 'Input', color: '#3b82f6' },
  { type: 'customOutput', label: 'Output', color: '#22c55e' },
  { type: 'llm', label: 'LLM', color: '#6366f1' },
  { type: 'text', label: 'Text', color: '#8b5cf6' },
  { type: 'prompt', label: 'Prompt', color: '#7c3aed' },
  { type: 'file', label: 'File', color: '#06b6d4' },
  { type: 'api', label: 'API', color: '#f97316' },
  { type: 'transform', label: 'Transform', color: '#ec4899' },
  { type: 'condition', label: 'Condition', color: '#f59e0b' },
];

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  deleteSelected: state.deleteSelected,
  clearCanvas: state.clearCanvas,
});

export const PipelineToolbar = () => {
  const { nodes, edges, deleteSelected, clearCanvas } = useStore(selector, shallow);
  const hasSelected = nodes.some((n) => n.selected) || edges.some((e) => e.selected);

  const handleClear = () => {
    if (window.confirm('Clear all nodes and edges from the canvas?')) {
      clearCanvas();
    }
  };

  const handleTutorial = () => {
    window.dispatchEvent(new Event('vs_open_tutorial'));
  };

  return (
    <div className="toolbar">
      <div className="toolbar__brand">
        <span className="toolbar__logo">VS</span>
        <span className="toolbar__title">VectorShift</span>
      </div>
      <div className="toolbar__palette">
        <div className="toolbar__section-label">Nodes</div>
        <div className="toolbar__nodes">
          {nodeList.map(({ type, label, color }) => (
            <DraggableNode
              key={type}
              type={type}
              label={label}
              icon={<NodeIcon type={type} />}
              color={color}
            />
          ))}
        </div>
      </div>
      <div className="toolbar__actions">
        <button
          className="toolbar-btn toolbar-btn--tutorial toolbar-btn--wide"
          onClick={handleTutorial}
        >
          Tutorial
        </button>
        <button
          className="toolbar-btn toolbar-btn--wide"
          onClick={deleteSelected}
          disabled={!hasSelected}
        >
          Delete Selected
        </button>
        <button className="toolbar-btn toolbar-btn--danger toolbar-btn--wide" onClick={handleClear}>
          Clear Canvas
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
};
