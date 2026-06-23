import { useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { OnboardingTutorial } from './components/OnboardingTutorial';

function App() {
  useEffect(() => {
    const saved = localStorage.getItem('vs_theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.setAttribute('data-theme', saved || (systemDark ? 'dark' : 'light'));
  }, []);

  return (
    <div className="app">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <OnboardingTutorial />
    </div>
  );
}

export default App;
