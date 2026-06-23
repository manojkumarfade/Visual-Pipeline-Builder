import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, inputs = [], outputs = [], children, accentColor }) => {
  const accent = accentColor || 'var(--accent)';

  return (
    <div className="base-node" style={{ '--node-accent': accent, borderLeft: `3px solid ${accent}` }}>
      {inputs.map((handle, i) => (
        <div
          key={handle.id}
          className="handle-wrapper handle-wrapper--left"
          style={{ top: `${((i + 1) / (inputs.length + 1)) * 100}%` }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
          />
          {handle.label && (
            <span className="handle-label handle-label--left">{handle.label}</span>
          )}
        </div>
      ))}

      <div className="base-node__header" style={{ color: accent, borderBottomColor: `${accent}30` }}>
        <span>{title}</span>
      </div>

      <div className="base-node__body">
        {children}
      </div>

      {outputs.map((handle, i) => (
        <div
          key={handle.id}
          className="handle-wrapper handle-wrapper--right"
          style={{ top: `${((i + 1) / (outputs.length + 1)) * 100}%` }}
        >
          {handle.label && (
            <span className="handle-label handle-label--right">{handle.label}</span>
          )}
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
          />
        </div>
      ))}
    </div>
  );
};
