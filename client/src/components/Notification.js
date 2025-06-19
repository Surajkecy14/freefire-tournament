import React from 'react';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: 'For Some Time',
      message: 'Notification will send to gmail account that you have provided.',
      time: 'nepGame',
    }
  ];

  return (
    <div
      className="container mt-5 p-4 rounded shadow-lg"
      style={{
        background: 'linear-gradient(to right, #d3cce3, #e9e4f0)',
        maxWidth: '800px',
      }}
    >
      <h2 className="text-center fw-bold mb-4">🔔 Notifications</h2>

      {notifications.map((note) => (
        <div
          key={note.id}
          className="alert alert-info shadow-sm mb-3"
          role="alert"
        >
          <h5 className="alert-heading">{note.title}</h5>
          <p>{note.message}</p>
          <hr />
          <p className="mb-0 text-end text-muted">{note.time}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
