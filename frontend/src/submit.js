import { useEffect, useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const getMessage = (result) => {
  if (result.num_nodes === 0) {
    return 'No nodes found. Add some nodes to the canvas first.';
  }
  if (result.is_dag) {
    return 'This pipeline is valid and has no cycles. It can be executed in topological order.';
  }
  return 'This pipeline contains a cycle. Remove the loop before execution.';
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (nodes.length === 0 && edges.length === 0) {
      setResult(null);
      setError(null);
    }
  }, [nodes.length, edges.length]);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Could not reach the backend. Make sure uvicorn main:app --reload is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-section">
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner" />
            Analyzing...
          </>
        ) : (
          'Submit Pipeline'
        )}
      </button>

      {result && (
        <div className={`result-panel ${result.is_dag ? 'result-panel--valid' : 'result-panel--invalid'}`}>
          <div className="result-panel__header">
            <span className="result-panel__title">Pipeline Analysis</span>
            <button
              className="result-panel__close"
              onClick={() => setResult(null)}
              aria-label="Close result panel"
            >
              x
            </button>
          </div>
          <div className="result-panel__stats">
            <div className="result-stat">
              <span>Nodes</span>
              <strong>{result.num_nodes}</strong>
            </div>
            <div className="result-divider" />
            <div className="result-stat">
              <span>Edges</span>
              <strong>{result.num_edges}</strong>
            </div>
            <div className="result-divider" />
            <div className={`result-badge ${result.is_dag ? 'result-badge--valid' : 'result-badge--invalid'}`}>
              {result.is_dag ? 'Valid DAG' : 'Contains Cycle'}
            </div>
          </div>
          <p className="result-panel__message">{getMessage(result)}</p>
        </div>
      )}

      {error && (
        <div className="result-error">{error}</div>
      )}
    </div>
  );
};
