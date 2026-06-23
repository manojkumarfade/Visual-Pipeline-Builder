import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Condition"
      accentColor="#f59e0b"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[
        { id: 'true', label: 'true' },
        { id: 'false', label: 'false' },
      ]}
    >
      <label className="node-field">
        <span>Condition</span>
        <input
          type="text"
          className="node-input"
          placeholder="value === 'yes'"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
