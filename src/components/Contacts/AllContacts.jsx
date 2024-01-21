import React from 'react'
import { Link } from 'react-router-dom'
import ContactsModal from './ContactsModal'

export default function AllContacts() {
  return (
    <Link to='/problem-2/all-contacts'>
      <ContactsModal initialModalLabel='A' initialButtonLabel='All Contacts' buttonColor='Primary' initialTabIndex={1} />
    </Link>
  )
}