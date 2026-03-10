import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="hero card">
      <h2>Student Teacher Evaluation</h2>
      <p>Anonymous survey to improve teaching quality in the college.</p>
      <Link className="btn" to="/survey">
        Start Survey
      </Link>
    </section>
  );
}
