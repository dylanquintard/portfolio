import React, { useState, useEffect } from 'react';
import '../styles/SkillBar.scss';

const SkillBar = ({ skill, percentage, display = 'block' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (progress < percentage) {
        setProgress((prevProgress) => prevProgress + 1);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [percentage, progress]);

  return (
    <div className="skillBar">
      <h3>{skill}</h3>
      <div className="progressBar">
        <div
          className="progress"
          style={{ width: `${progress}%`, backgroundColor: getColor(progress) }}
        ></div>
      </div>
    </div>
  );
};

const getColor = (percentage) => {
  if (percentage >= 80) {
    return 'green';
  } else if (percentage >= 60) {
    return 'orange';
  } else {
    return 'red';
  }
};

export default SkillBar;