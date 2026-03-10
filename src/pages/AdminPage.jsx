import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const STORAGE_KEY = 'teacherSurveyResponses';

export default function AdminPage() {
  const responses = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const surveyCount = responses.length;

  const ratingsList = responses.flatMap((item) => Object.values(item.ratings || {}));

  const averageRating = ratingsList.length
    ? (ratingsList.reduce((sum, value) => sum + Number(value), 0) / ratingsList.length).toFixed(2)
    : '0.00';

  const distribution = [1, 2, 3, 4, 5].map(
    (score) => ratingsList.filter((value) => Number(value) === score).length
  );

  const averageChartData = {
    labels: ['Average Teacher Rating'],
    datasets: [
      {
        label: 'Average',
        data: [averageRating],
        backgroundColor: '#4f46e5'
      }
    ]
  };

  const distributionChartData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Rating Distribution',
        data: distribution,
        backgroundColor: ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#6366f1']
      }
    ]
  };

  return (
    <section className="admin-grid">
      <article className="card stats">
        <h2>Admin Dashboard</h2>
        <p>
          <strong>Количество опросов:</strong> {surveyCount}
        </p>
        <p>
          <strong>Средний рейтинг преподавателей:</strong> {averageRating}
        </p>
      </article>

      <article className="card">
        <h3>Average teacher rating</h3>
        <Bar data={averageChartData} options={{ scales: { y: { min: 0, max: 5 } } }} />
      </article>

      <article className="card">
        <h3>Rating distribution</h3>
        <Pie data={distributionChartData} />
      </article>

      <article className="card table-card">
        <h3>Список ответов</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Teacher</th>
                <th>Subject</th>
                <th>Course</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((item, index) => (
                <tr key={`${item.teacherName}-${index}`}>
                  <td>{new Date(item.submittedAt).toLocaleString()}</td>
                  <td>{item.teacherName}</td>
                  <td>{item.subject}</td>
                  <td>{item.course}</td>
                  <td>{item.group}</td>
                </tr>
              ))}
              {responses.length === 0 && (
                <tr>
                  <td colSpan={5}>No responses yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
