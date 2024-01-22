import { Link } from 'react-router-dom';
import ContactsModal from './ContactsModal';

const USCountries = () => {
  return (
    <Link to='/problem-2/us-contacts'>
      <ContactsModal initialModalLabel="B" initialButtonLabel="US Contacts" buttonColor="warning" initialTabIndex={2} />
    </Link>
  )
  
};

export default USCountries;