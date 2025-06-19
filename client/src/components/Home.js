import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="container mt-5 p-4 rounded shadow-lg"
      style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}
    >
      <h1 className="mb-4 fw-bold" style={{ color: '#fcd34d' }}>
        Welcome to <span style={{ color: '#f87171' }}>nepGame</span>
      </h1>
      <p className="lead fs-5">
        This is <strong>nepGame</strong> where FreeFire tournaments will be{' '}
        <span style={{ color: '#fbbf24' }}>published</span>. People can join tournaments by paying a fee and
        win exciting <span style={{ color: '#34d399' }}>prizes</span>.
      </p>
      <p className="lead fs-5">
        When a tournament is published, you can find it in the{' '}
        <Link to="/tournment" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'underline' }}>
          Tournament section
        </Link>
        .
      </p>
      <p className="lead fs-5">
        For any help or questions, visit our{' '}
        <Link to="/support" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'underline' }}>
          Support
        </Link>{' '}
        page.
      </p>
      <p className="lead fs-5">
        To join a tournament, you must be logged in, so make sure to{' '}
        <Link to="/login" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'underline' }}>
          Login
        </Link>
        .
      </p>
      <p className="lead fs-5">
        To view your game ID, visit your{' '}
        <Link to="/profile" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'underline' }}>
          Profile
        </Link>
        .
      </p>

      {/* Rule Book Button */}
      <div className="mt-4">
        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#ruleBookModal">
          📘 Tournament Rule Book
        </button>
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="ruleBookModal" tabIndex="-1" aria-labelledby="ruleBookModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="ruleBookModalLabel">Tournament Rules</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-dark">
              <ul>
                <li>Character skills, will power, and attributes are turned off — no advantage for these.</li>
                <li>Using vehicles is allowed — do anything in-game, it's fully legal.</li>
                <li>After sending a join request and if you’ve paid genuinely, the match will appear in <strong>My Match</strong>.</li>
                <li>Please wait a few minutes after joining — your match info will come soon.</li>
                <li>No cheating, hacks, or third-party tools — instant disqualification.</li>
                <li>Be respectful and avoid any kind of toxic behavior.</li>
                <li>Only registered users can participate in tournaments.</li>
                <li>Entry fees are non-refundable unless a match is cancelled by admin.</li>
                <li>"Teaming up is strictly prohibited. If the last three players remain and two are found teaming up,
                   the third player will be declared the winner and awarded the prize."</li>
                   
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
