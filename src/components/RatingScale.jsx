const SCALE_LABELS = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent'
};

export default function RatingScale({ question, value, onChange }) {
  return (
    <div className="question-card card">
      <p>{question}</p>
      <div className="rating-grid">
        {[1, 2, 3, 4, 5].map((score) => (
          <label key={score} className={`rating-option ${value === score ? 'active' : ''}`}>
            <input
              type="radio"
              name={question}
              value={score}
              checked={value === score}
              onChange={() => onChange(score)}
            />
            <span>{score}</span>
            <small>{SCALE_LABELS[score]}</small>
          </label>
        ))}
      </div>
    </div>
  );
}
