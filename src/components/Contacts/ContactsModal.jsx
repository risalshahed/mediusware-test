import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import EachContact from './EachContact';

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
  const [selectedContact, setSelectedContact] = useState(null);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://contact.mediusware.com/api/contacts/?page=1`);
        const data = await res.json();
        // console.log(data.results);
        setNextPage(data.next);
        const results = data.results ? data.results : [];
        // console.log('results', results);
        setItems(prevItems => [...prevItems, ...results]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    }
    // fetchData();

    // handle infinite scroll
    const scrollContainer = document.getElementById('scroll-container');

    // event listener for scrolling
    const handleScroll = () => {
      if (scrollContainer &&
        Math.round(scrollContainer.scrollTop) + Math.round(scrollContainer.clientHeight) == scrollContainer.scrollHeight && nextPage
      ) {
        fetchData();
        setPage(prevPage => prevPage + 1);
      }
    }

    // attach the event listener when the component mounts
    if(scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    if(show && page == 1) {
      fetchData();
      setPage(prevPage => prevPage + 1);
    }

    // remove the event listener when the component unmounts
    return () => {
      if(scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    }

  }, [page])

  const handleAllCountries = e => {
    e.preventDefault();
    navigate('/problem-2/all-contacts');
    setModalLabel('A');
    setButtonLabel('All Contacts');
    setTabIndex(1);
    setItems([]);
    setPage(1);
  }

  const handleUSCountries = e => {
    e.preventDefault();
    navigate('/problem-2/us-contacts');
    setModalLabel('B');
    setButtonLabel('US Contacts');
    setTabIndex(2);
    setItems([]);
    setPage(1);
  }

  const handleShow = () => {
    setShow(true);
    setPage(1);
  }

  const handleClose = () => {
    navigate('/problem-2');
    setShow(false);
    setButtonLabel(initialButtonLabel);
    setTabIndex(1);
    setIsChecked(false);
  }

  const filteredContacts = items.filter(contact => {
    if(tabIndex === 1) {
      return (
        contact.country.name.toLowerCase().includes(query.toLowerCase()) || contact.phone.includes(query)
      )
    } else if (tabIndex === 2) {
      return (
        contact.country.name === 'United States' &&
        (contact.country.name.toLowerCase().includes(query.toLowerCase()) || contact.phone.includes(query))
      )
    }
    return false;
  })

  const handleOnlyEven = () => setIsChecked(!isChecked);

  // handle contact to display detailed information for each contact
  const handleContactClick = contact => setSelectedContact(contact);

  return (
    <div>
      <button
        className={`btn btn-lg btn-outline-${buttonColor}`}
        onClick={handleShow}
      >
        {buttonLabel}
      </button>


      <Modal show={show} onHide={handleClose}>
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
              {filteredContacts?.map(contact => (
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
              ))}
            </ul>
            {loading && <div>Loading...</div>}
          </div>
          

          <EachContact
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button className='buttonA' onClick={handleAllCountries}>
            All Contacts
          </Button>
          
          <Button className='buttonB' onClick={handleUSCountries}>
            US Contacts
          </Button>

          <Button className='buttonA' onClick={handleClose}>
            Close
          </Button>

          <Form.Check
            type='switch'
            label='Only Even'
            checked={isChecked}
            onClick={handleOnlyEven}
          />
        </Modal.Footer>
      </Modal>
    </div>
  )
}