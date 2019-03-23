import * as React from 'react';
import './App.css';

import { TreeGraph } from './component/TreeGraph';
import { Suspense } from 'react';

class App extends React.Component {
  public render() {
    return (
      <Suspense fallback={<span>Loading...</span>}>
        <TreeGraph />
      </Suspense>
    );
  }
}

export default App;
