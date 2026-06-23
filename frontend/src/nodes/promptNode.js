import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const PromptNode = ({ id, data }) => {
  const [template, setTemplate] = useState(data?.template || '');

  return (
    <BaseNode
      id={id}
      title="Prompt"
      accentColor="#7c3aed"
      inputs={[{ id: 'context', label: 'context' }]}
      outputs={[{ id: 'prompt', label: 'prompt' }]}
    >
      <label className="node-field">
        <span>Template</span>
        <textarea
          className="node-textarea"
          rows={3}
          placeholder="Write your prompt template..."
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
