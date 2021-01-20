import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { HomePage } from './components/HomePage';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('./QuestionsData', () => ({
  getUnansweredQuestions: jest.fn(() => {
    return Promise.resolve([
      {
        questionId: 1,
        title: 'Title1 test',
        content: 'Content1 test',
        userName: 'User1',
        created: new Date(2019, 1, 1),
        answers: [],
      },
      {
        questionId: 2,
        title: 'Title2 test',
        content: 'Content2 test',
        userName: 'User2',
        created: new Date(2019, 1, 1),
        answers: [],
      },
    ]);
  }),
}));

test('When HomePage first rendered, loading indicator should show', () => {
  let mock: any = jest.fn();
  const { getByText } = render(
    <BrowserRouter>
      <HomePage history={mock} location={mock} match={mock} />
    </BrowserRouter>,
  );

  const loading = getByText('Loading...');
  expect(loading).not.toBeNull();
});
