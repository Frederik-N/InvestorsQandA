// eslint-disable-next-line
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../Store';
import { HeaderWithRouter as Header } from './Header';
import { HomePage } from './HomePage';
import { fontFamily, fontSize, gray2 } from './Styles';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { NotFoundPage } from './NotFoundPage';
import { QuestionPage } from './QuestionPage';
import { SignOutPage } from './SignOutPage';
import { AuthProvider } from '../Auth';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthorizedPage } from './AuthorizedPage';
const AskPage = lazy(() => import('./AskPage'));

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          {' '}
          <div
            css={css`
              font-family: ${fontFamily};
              font-size: ${fontSize};
              color: ${gray2};
            `}
          >
            <Header />
            <Switch>
              <Redirect from="/home" to="/" />
              <Route exact path="/" component={HomePage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/ask">
                <Suspense
                  fallback={
                    <div
                      css={css`
                        margin-top: 100px;
                        text-align: center;
                      `}
                    >
                      Loading...
                    </div>
                  }
                >
                  <AuthorizedPage>
                    <AskPage />
                  </AuthorizedPage>
                </Suspense>
              </Route>
              <Route
                path="/signin"
                render={() => <SignInPage action="signin" />}
              />
              <Route
                path="/signin-callback"
                render={() => <SignInPage action="signin-callback" />}
              />
              <Route
                path="/signout"
                render={() => <SignOutPage action="signout" />}
              />
              <Route
                path="/signout-callback"
                render={() => <SignOutPage action="signout-callback" />}
              />
              <Route path="/questions/:questionId" component={QuestionPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
