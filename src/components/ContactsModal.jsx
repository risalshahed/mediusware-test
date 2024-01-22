import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import EachCountry from './EachCountry';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const ContactsModal = ({ initialModalLabel, initialButtonLabel, buttonColor,
 initialTabIndex }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(initialTabIndex);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalLabel, setModalLabel] = useState(initialModalLabel);
  const [buttonLabel, setButtonLabel] = useState(initialButtonLabel);
  const [query, setQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://contact.mediusware.com/api/contacts/?page=${page}`);
        const newData = await response.json();
        setNextPage(newData.next);
        const results = newData.results ? newData.results : [];
        setItems((prevItems) => [...prevItems, ...results]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    const scrollContainer = document.getElementById('scroll-container');

    const handleScroll = () => {
      if (
        scrollContainer &&
        Math.round(scrollContainer.scrollTop) + Math.round(scrollContainer.clientHeight) === scrollContainer.scrollHeight &&
        nextPage
      ) {
        fetchData();
        setPage(prevPage => prevPage + 1);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    if (show && page === 1) {
      fetchData();
      setPage(prevPage => prevPage + 1);
    }

    // remove the scroll event
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [page, nextPage, show]);

  // const delayedSearch = debounce((searchQuery) => setQuery(searchQuery), 1500);

  useEffect(() => {
    // delayedSearch(debouncedSearch);
    const delayedSearch = setTimeout(() => {
    setQuery(debouncedSearch);
    }, 1500);

    return () => {
      clearTimeout(delayedSearch);
    };
  }, [debouncedSearch]);

  const handleInputChange = e => {
    console.log('searcing contacts');
    setDebouncedSearch(e.target.value);
  };

  const handleAllCountries = (e) => {
    e.preventDefault();
    navigate('/problem-2/all-contacts');
    setModalLabel('A');
    setButtonLabel('All Contacts');
    setTabIndex(1);
    setPage(1);
    setItems([]);
  };

  const handleUSCountries = (e) => {
    e.preventDefault();
    navigate('/problem-2/us-contacts');
    setModalLabel('B');
    setButtonLabel('US Contacts');
    setTabIndex(2);
    setPage(1);
    setItems([]);
  };

  const handleClose = () => {
    setTimeout(() => {
      navigate('/problem-2');
    }, 0);
    setShow(false);
    setButtonLabel(initialButtonLabel);
    setTabIndex(initialTabIndex);
    setIsChecked(false);
  };

  const handleShow = () => {
    setShow(true);
    setPage(1);
  };

  const filteredContacts = items.filter(contact => {
    const countryName = contact.country.name.toLowerCase();
    const phone = contact.phone.toLowerCase();
    const searchQueryLower = query.toLowerCase();

    if (tabIndex === 1) {
      return (
        countryName.includes(searchQueryLower) ||
        phone.includes(searchQueryLower)
      );
    } else if (tabIndex === 2) {
      return (
        contact.country.name === 'United States' &&
        (countryName.includes(searchQueryLower) || phone.includes(searchQueryLower))
      );
    }
    
    return false;
  });

  const handleOnlyEven = () => setIsChecked(!isChecked);

  const handleContactClick = (contact) => setSelectedContact(contact);

  return (
    <div>
      <button
        onClick={handleShow}
        className={`btn btn-lg btn-outline-${buttonColor}`}
        type="button"
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
              value={debouncedSearch}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setQuery(debouncedSearch);
                }
              }}
              placeholder="Search here"
            />
          </Form.Group>

          <div
            id="scroll-container"
            style={{
              maxHeight: `${tabIndex === 1 ? '300px' : '120px'}`,
              overflowY: 'auto',
            }}
          >
            <ul className="contacts">
              <li>
                <h4>Country</h4>
                <h4>Phone</h4>
              </li>
              {filteredContacts?.map((contact) => (
                isChecked ? (
                  contact.id % 2 === 0 && (
                    <li key={contact.id} onClick={() => handleContactClick(contact)}>
                      <div>{contact.country.name}</div>
                      <div>{contact.phone}</div>
                    </li>
                  )
                ) : (
                  <li key={contact.id} onClick={() => handleContactClick(contact)}>
                    <div>{contact.country.name}</div>
                    <div>{contact.phone}</div>
                  </li>
                )
              ))}
            </ul>
            {loading && <Loading />}
          </div>

          <EachCountry
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button className="buttonA" onClick={handleAllCountries}>
            All Contacts
          </Button>

          <Button className="buttonB" onClick={handleUSCountries}>
            US Contacts
          </Button>

          <Button className="buttonA" onClick={handleClose}>
            Close
          </Button>

          <Form.Check
            type="switch"
            label="Only Even"
            checked={isChecked}
            onClick={handleOnlyEven}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactsModal;