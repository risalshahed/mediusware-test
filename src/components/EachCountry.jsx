import { Button, Modal } from 'react-bootstrap';

const EachCountry = ({ contact, onClose }) => {
  return (
    <Modal show={contact !== null} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {contact && (
          <div>
            <h6>Id: {contact.id}</h6>
            <h6>Country: {contact.country.name}</h6>
            <h6>Phone: {contact.phone}</h6>
            {/* Add more contact details here */}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button className='buttonA' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EachCountry;