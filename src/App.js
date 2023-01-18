import React from 'react';
import { ToastBar, Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routess } from './router/Routess';

const App = () => {
  return (
      <>
        <Toaster>
          {(t) => (
              <ToastBar
                  toast={t}
                  style={{
                    ...t.style,
                    animation: t.visible
                        ? 'custom-enter 1s ease'
                        : 'custom-exit 1s ease',
                  }}
                  toastOptions={{
                    success: {
                      style: {
                        background: 'green',
                      },
                    },
                    error: {
                      style: {
                        background: 'red',
                      },
                    },
                  }}
              />
          )}
        </Toaster>
        <Router>
          <Routess />
        </Router>
      </>
  );
};

export default App;
