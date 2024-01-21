import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

export default function ContactsModal({ initialModalLabel, initialButtonLabel, buttonColor, initialTabIndex }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(true);

  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(initialTabIndex);
  const [modalLabel, setModalLabel] = useState(initialModalLabel);
  const [buttonLabel, setButtonLabel] = useState(initialButtonLabel);
  const [isChecked, setIsChecked] = useState(false);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://contact.mediusware.com/api/contacts/?page=1`);
      const data = await res.json();
      console.log(data.results);
    }

    fetchData();

  }, [])

  return (
    <div>
      <button
        className={`btn btn-lg btn-outline-${buttonColor}`}
        type='button'
      >
        {buttonLabel}
      </button>


      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{`Modal ${modalLabel} for ${buttonLabel}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search here"
            />
          </Form.Group>

          <div id="scroll-container" style={{ maxHeight: `${tabIndex == 1 ? '300px' : '100px' }`, overflowY: 'auto' }}>
            <ul className='contacts'>
              <li>
                <h4>Country</h4>
                <h4>Phone</h4>
              </li>
              {/* {filteredContacts?.map(contact => (
                isChecked
                ?
                (
                  contact.id % 2 === 0
                  &&
                  <li key={contact.id} onClick={() => handleContactClick(contact)}>
                    <div>{contact.country.name}</div>
                    <div>{contact.phone}</div>
                  </li>
                )
                :
                (
                  <li key={contact.id} onClick={() => handleContactClick(contact)}>
                    <div>{contact.country.name}</div>
                    <div>{contact.phone}</div>
                  </li>
                )
              ))} */}
            </ul>
            {loading && <div>Loading...</div>}
          </div>
          

          {/* <EachCountry
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          /> */}
        </Modal.Body>

        <Modal.Footer>
          <Button className='buttonA' >
            All Contacts
          </Button>
          
          <Button className='buttonB' >
            US Contacts
          </Button>

          <Button className='buttonA' >
            Close
          </Button>

          <Form.Check
            type='switch'
            label='Only Even'
            checked={isChecked}
            
          />
        </Modal.Footer>
      </Modal>
    </div>
  )
}