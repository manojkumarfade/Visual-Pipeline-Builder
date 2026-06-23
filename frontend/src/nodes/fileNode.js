import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FileNode = ({ id, data }) => {
  const [fileName, setFileName] = useState(data?.fileName || '');

  return (
    <BaseNode
      id={id}
      title="File"
      accentColor="#06b6d4"
      inputs={[]}
      outputs={[{ id: 'content', label: 'content' }]}
    >
      <label className="node-field">
        <span>File Name</span>
        <input
          type="text"
          className="node-input"
          placeholder="document.pdf"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
