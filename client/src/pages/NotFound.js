import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Go back to the previous page after 3 seconds
    const timeoutId = setTimeout(() => {
      navigate(-1); // Go back one step in the history
    }, 33000);

    return () => {
      // Clear the timeout on component unmount
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Page not found. Redirecting...</p>
      <button  className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => navigate(-1)}>That's a not found page , if you want to back click on me</button>
    </div>
  );
}

export default NotFound;
