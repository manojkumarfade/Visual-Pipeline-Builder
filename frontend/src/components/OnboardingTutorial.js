import { useEffect, useState } from 'react';

const STEPS = [
  {
    title: 'Welcome to VectorShift',
    body: 'This is a visual AI pipeline builder. Connect nodes to design data flows - no code required.',
  },
  {
    title: 'Drag Nodes',
    body: 'Drag any node from the left sidebar and drop it onto the canvas to add it to your pipeline.',
  },
  {
    title: 'Connect Nodes',
    body: 'Hover over a node to see its handles. Click and drag from a handle to connect it to another node.',
  },
  {
    title: 'Text Variables',
    body: 'In the Text node, type {{ variableName }} to automatically create an input handle for that variable.',
  },
  {
    title: 'Submit Your Pipeline',
    body: 'Click Submit Pipeline to validate the graph. The backend returns node count, edge count, and whether the graph is cycle-free (DAG).',
  },
];

export const OnboardingTutorial = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('vs_tutorial_seen')) {
      setVisible(true);
    }

    const openTutorial = () => {
      setStep(0);
      setVisible(true);
    };

    window.addEventListener('vs_open_tutorial', openTutorial);

    return () => window.removeEventListener('vs_open_tutorial', openTutorial);
  }, []);

  const dismiss = () => {
    localStorage.setItem('vs_tutorial_seen', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <div
      className="tutorial-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="tutorial-card">
        <button className="tutorial-skip" onClick={dismiss} aria-label="Skip tutorial">
          x
        </button>
        <h2 className="tutorial-title">{STEPS[step].title}</h2>
        <p className="tutorial-body">{STEPS[step].body}</p>
        <div className="tutorial-dots">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`tutorial-dot ${i === step ? 'tutorial-dot--active' : ''}`}
            />
          ))}
        </div>
        <div className="tutorial-actions">
          <button
            className="tutorial-btn tutorial-btn--secondary"
            onClick={() => setStep((s) => s - 1)}
            disabled={isFirst}
          >
            Back
          </button>
          <button
            className="tutorial-btn tutorial-btn--primary"
            onClick={isLast ? dismiss : () => setStep((s) => s + 1)}
          >
            {isLast ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
