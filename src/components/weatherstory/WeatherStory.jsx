import { useState } from 'react';
import '../weatherstory/weatherstory.css';

const WeatherStory = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState('');

  const handleStoryChange = (e) => {
    setNewStory(e.target.value);
  };

  const handleStorySubmit = (e) => {
    e.preventDefault();
    if (newStory.trim()) {
      setStories([...stories, newStory.trim()]);
      setNewStory('');
    }
  };

  return (
    <div className="WeatherStory">
      <h2>Share your stories with Everyone </h2>
      <form onSubmit={handleStorySubmit}>
        <textarea
          value={newStory}
          onChange={handleStoryChange}
          placeholder="Share your weather story"
        />
        <button className='submit-btn' type="submit">Submit Story</button>
      </form>
      <div className="stories">
        {stories.map((story, index) => (
          <p key={index}>{story}</p>
        ))}
      </div>
    </div>
  );
};

export default WeatherStory;