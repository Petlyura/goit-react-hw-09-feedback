import { useState, useEffect } from "react";

import Section from "./components/Section";
import FeedbackOptions from "./components/FeedbackOptions";
import Statistics from "./components/Statistics";
import Notification from "./components/Notification";

export default function App() {
  // state = {
  //   good: 0,
  //   neutral: 0,
  //   bad: 0,
  // };

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positive, setPositive] = useState();

  // handleLeaveFeedback = ({ target: { name } }) => {
  //   this.setState((prevState) => ({ [name]: prevState[name] + 1 }));
  // };

  const handleLeaveFeedback = ({ target: { name } }) => {
    switch (name) {
      case "good":
        setGood((prevState) => prevState + 1);
        break;
      case "neutral":
        setNeutral((prevState) => prevState + 1);
        break;
      case "bad":
        setBad((prevState) => prevState + 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setTotal(good + neutral + bad);
  }, [good, neutral, bad]);

  // countTotalFeedback = () => {
  //   const total = Object.values(this.state).reduce(
  //     (acc, value) => acc + value,
  //     0
  //   );
  //   return total;
  // };

  useEffect(() => {
    total ? setPositive(Math.round((good / total) * 100)) : setPositive(0);
  }, [good, total]);

  // countPositiveFeedbackPercentage = () => {
  //   const total = this.countTotalFeedback();
  //   const positiveFeedback = this.state.good;
  //   const positiveFeedbackPercentage = total
  //     ? Math.round((positiveFeedback / total) * 100)
  //     : 0;

  //   return positiveFeedbackPercentage;
  // };

  // render() {
  //   const { good, neutral, bad } = this.state;
  //   const totalFeedback = this.countTotalFeedback();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={handleLeaveFeedback} />
      </Section>
      <Section>
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positive}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </>
  );
}
// }
