import { useState } from 'react';
import { Statistics } from './FeedbackStatistics/FeedbackStatistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification /Notification';
import { FeedbackWrap } from './Feedback/Feedback.styled';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = name => {
    switch (name) {
      case 'good':
        setGood(good + 1);
        break;

      case 'neutral':
        setNeutral(neutral + 1);
        break;

      case 'bad':
        setBad(bad + 1);
        break;

      default:
        break;
    }
  };

  function countTotalFeedback() {
    return good + neutral + bad;
  }

  function countPositiveFeedbackPercentage() {
    if (countTotalFeedback() === 0) {
      return 0;
    }
    return ((good / countTotalFeedback()) * 100).toFixed();
  }

  return (
    <FeedbackWrap>
      <Section title={'Please leave a feedback'}>
        <FeedbackOptions
          options={['good', 'bad', 'neutral']}
          onLeaveFeedback={handleFeedback}
        ></FeedbackOptions>
      </Section>
      {countTotalFeedback() !== 0 ? (
        <Section title={'Statistics'}>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </FeedbackWrap>
  );
}
