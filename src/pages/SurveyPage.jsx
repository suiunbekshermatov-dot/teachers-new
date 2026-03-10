import { useMemo, useState } from 'react';
import RatingScale from '../components/RatingScale';

const STORAGE_KEY = 'teacherSurveyResponses';

const QUESTIONS = [
  'Teacher explains material clearly',
  'Teacher is well prepared for classes',
  'Teacher respects students',
  'Teacher answers questions clearly',
  'Teacher makes the subject interesting',
  'Teacher manages class time well',
  'Teacher uses useful materials',
  'Teacher is fair in grading',
  'Teacher encourages participation',
  'Overall satisfaction with teaching'
];

const COURSE_OPTIONS = ['Computer Science', 'Business', 'Engineering', 'Design', 'Other'];

export default function SurveyPage() {
  const initialRatings = useMemo(
    () =>
      QUESTIONS.reduce((acc, question) => {
        acc[question] = 3;
        return acc;
      }, {}),
    []
  );

  const [form, setForm] = useState({
    course: COURSE_OPTIONS[0],
    group: '',
    subject: '',
    teacherName: '',
    ratings: initialRatings,
    likes: '',
    improve: '',
    suggestions: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setRating = (question, value) => {
    setForm((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [question]: value
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const surveyData = {
      ...form,
      submittedAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(surveyData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    setSubmitted(true);
    setForm({
      course: COURSE_OPTIONS[0],
      group: '',
      subject: '',
      teacherName: '',
      ratings: initialRatings,
      likes: '',
      improve: '',
      suggestions: ''
    });
  };

  return (
    <section className="card">
      <h2>Teacher Survey Form</h2>
      {submitted && <p className="success-message">Thank you for your feedback.</p>}

      <form className="survey-form" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <label>
            Course
            <select value={form.course} onChange={(e) => setField('course', e.target.value)}>
              {COURSE_OPTIONS.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>

          <label>
            Group
            <input
              type="text"
              required
              value={form.group}
              onChange={(e) => setField('group', e.target.value)}
            />
          </label>

          <label>
            Subject
            <input
              type="text"
              required
              value={form.subject}
              onChange={(e) => setField('subject', e.target.value)}
            />
          </label>

          <label>
            Teacher name
            <input
              type="text"
              required
              value={form.teacherName}
              onChange={(e) => setField('teacherName', e.target.value)}
            />
          </label>
        </div>

        <div className="section-title">Rate the teacher (1–5)</div>
        {QUESTIONS.map((question) => (
          <RatingScale
            key={question}
            question={question}
            value={form.ratings[question]}
            onChange={(value) => setRating(question, value)}
          />
        ))}

        <div className="grid">
          <label>
            Что вам больше всего нравится в работе преподавателя?
            <textarea value={form.likes} onChange={(e) => setField('likes', e.target.value)} rows={3} />
          </label>

          <label>
            Что можно улучшить?
            <textarea value={form.improve} onChange={(e) => setField('improve', e.target.value)} rows={3} />
          </label>

          <label>
            Ваши предложения.
            <textarea
              value={form.suggestions}
              onChange={(e) => setField('suggestions', e.target.value)}
              rows={3}
            />
          </label>
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}
