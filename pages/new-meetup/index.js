// our-domain.com/new-meetup
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const addMeetupHandler = async (newMeetupData) => {
    console.log('🚀 - file: index.js - line 5 - data', newMeetupData);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(newMeetupData),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const data = await response.json();

    console.log('🚀 - file: index.js - line 16 - data', data);
  };
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
