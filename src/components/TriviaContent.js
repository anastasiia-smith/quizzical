import Questions from './Questions.js';
import Button from './Button.js';

export default function TriviaContent({
  triviaData,
  handleSetAnswers,
  answers,
  check,
  correctAnswersCount,
  handleCheck,
  handleNewStart,
  isLoading,
}) {
  return (
    <>
      {isLoading ? (
        <>
          <svg
            className='loader'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 100 100'
            enable-background='new 0 0 0 0'
          >
            <path
              fill='#4d5b9e'
              d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'
            >
              <animateTransform
                attributeName='transform'
                attributeType='XML'
                type='rotate'
                dur='1s'
                from='0 50 50'
                to='360 50 50'
                repeatCount='indefinite'
              />
            </path>
          </svg>
        </>
      ) : (
        <>
          <Questions
            triviaData={triviaData}
            handleSetAnswers={handleSetAnswers}
            answers={answers}
            check={check}
          />
          <div className='quiz__footer'>
            {check ? (
              <Button onClick={handleCheck} className='quiz__button'>
                Check answers
              </Button>
            ) : (
              <>
                <span className='score'>
                  You scored {correctAnswersCount} correct answer
                  {correctAnswersCount > 1 || correctAnswersCount === 0
                    ? 's'
                    : ''}
                </span>
                <Button onClick={handleNewStart} className='quiz__button'>
                  Play again
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
