import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');

  return (
    <BaseNode
      id={id}
      title="Transform"
      accentColor="#ec4899"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <label className="node-field">
        <span>Operation</span>
        <select
          className="node-select"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="json_parse">JSON Parse</option>
          <option value="json_stringify">JSON Stringify</option>
        </select>
      </label>
    </BaseNode>
  );
};
