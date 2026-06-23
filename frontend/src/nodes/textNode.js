import { useState, useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const matches = [...text.matchAll(VARIABLE_REGEX)];
  const names = matches.map((m) => m[1]);
  return [...new Set(names)];
}

export const TextNode = ({ id, data }) => {
  const accentColor = '#8b5cf6';
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));

  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variables, updateNodeInternals]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div
      className="base-node text-node"
      style={{ '--node-accent': accentColor, borderLeft: `3px solid ${accentColor}` }}
    >
      {variables.map((varName, i) => (
        <div
          key={`${id}-var-${varName}`}
          className="handle-wrapper handle-wrapper--left"
          style={{ top: `${((i + 1) / (variables.length + 1)) * 100}%` }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-var-${varName}`}
            title={varName}
          />
          <span className="handle-label handle-label--left">{varName}</span>
        </div>
      ))}

      <div className="base-node__header" style={{ color: accentColor, borderBottomColor: `${accentColor}30` }}>
        <span>Text</span>
      </div>

      <div className="base-node__body">
        <label className="node-field">
          <span>Content</span>
          <textarea
            ref={textareaRef}
            className="node-textarea text-node-textarea"
            value={currText}
            onChange={handleTextChange}
            placeholder="Type text here. Use {{ variable }} to create inputs."
            rows={1}
          />
        </label>

        {variables.length > 0 && (
          <div className="text-node__vars">
            {variables.map((v) => (
              <span key={v} className="text-node__var-chip">{v}</span>
            ))}
          </div>
        )}
      </div>

      <div className="handle-wrapper handle-wrapper--right" style={{ top: '50%' }}>
        <span className="handle-label handle-label--right">output</span>
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-output`}
        />
      </div>
    </div>
  );
};
