import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  return (
    <BaseNode
      id={id}
      title="API"
      accentColor="#f97316"
      inputs={[{ id: 'body', label: 'body' }]}
      outputs={[
        { id: 'response', label: 'response' },
        { id: 'status', label: 'status' },
      ]}
    >
      <label className="node-field">
        <span>Method</span>
        <select
          className="node-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <label className="node-field">
        <span>URL</span>
        <input
          type="text"
          className="node-input"
          placeholder="https://api.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
