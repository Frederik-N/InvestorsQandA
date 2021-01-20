import React, { useEffect, useState, FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PrimaryButton } from './Styles';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from '../QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../Auth';

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      if (!cancelled) {
        setQuestions(unansweredQuestions);
        setQuestionsLoading(false);
      }
    };
    doGetUnansweredQuestions();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAskQuestionClick = () => {
    history.push('/ask');
  };

  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <div
        css={css`
          margin: 50px auto 20px auto;
          padding: 30px 20px;
          max-width: 600px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <PageTitle
            css={css`
              font-size: 15px;
              font-weight: bold;
              margin: 10px 0px 5px;
              text-align: center;
              text-transform: uppercase;
            `}
          >
            Unanswered Questions
          </PageTitle>
          {isAuthenticated && (
            <PrimaryButton onClick={handleAskQuestionClick}>
              Ask a Question
            </PrimaryButton>
          )}
        </div>
      </div>
      {questionsLoading ? (
        <div
          css={css`
            font-size: 16px;
            font-style: italic;
          `}
        >
          Loading...
        </div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
