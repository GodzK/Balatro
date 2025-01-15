import { useState, useEffect } from 'react';

const Play = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Play">
      {isLoading ? (
       <div className="loader"> 
       <span>L</span>
       <span>o</span>
       <span>a</span>
       <span>d</span>
       <span>i</span>
       <span>n</span>
       <span>g</span>
       <span>.</span>
       <span>.</span>
       <span>.</span>
     </div>
      ) : (
        <div className="main-content">
          <h1>Welcome to the Main Content!</h1>
          <p>This is your React Play after the loading screen.</p>
        </div>
      )}
    </div>
  );
};

export default Play;
