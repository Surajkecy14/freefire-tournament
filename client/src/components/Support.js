import React from 'react';

const Support = () => {
  return (
    <div
      className="container mt-5 p-4 rounded shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
        color: '#1a1a1a',
        maxWidth: '650px',
      }}
    >
      <h2 className="mb-4 fw-bold text-center">Support</h2>

      <p className="fw-semibold">
        📱 WhatsApp:{' '}
        <a href="https://wa.me/9779767271161" target="_blank" rel="noreferrer">
          9767271161
        </a>
      </p>

      <p className="fw-semibold">
        📘 Facebook: <span className="text-muted">Coming Soon</span>
      </p>

      <hr />

      <p className="mt-4">
        🕐 <strong>Prize Distribution Promise:</strong>
        <br />
        We promise to distribute the prize within <strong>1 hour</strong> of tournament completion.
        <br />
        🚫 Please <strong>do not call or message</strong> before that.
        <br />
        ⏳ If you haven’t received your prize even after 1 hour, feel free to call or message us — we’ll handle it as fast as possible.
        <br />
        🙏 Our goal is to make sure you never have to use this section.
      </p>
    </div>
  );
};

export default Support;
