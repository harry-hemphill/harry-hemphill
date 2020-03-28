import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };
  state = {
    query: ''
  };

  updateQuery = query => {
    this.setState(() => ({
      query: query
    }));
  };
  clearQuery = () => {
    this.updateQuery('');
  };

  render() {
    const { query } = this.state;
    const { contacts, onDeleteContact } = this.props;

    const showingContacts =
      query === ''
        ? contacts
        : contacts.filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase())
          );
    return (
      <div className='list-contacts'>
        <div className='list-input-top'>
          <input
            className='search-contact'
            type='text'
            placeholder='Search text'
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <Link to='/create' className='addContact'>
            Add Contacts
          </Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contactst'>
            <span>
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show all Contacts</button>
          </div>
        )}
        <ol className='contact-title'>
          {showingContacts.map(contact => (
            <li key={contact.id} className='contact-list-item'>
              <div
                className='contact-avatar'
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              ></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className='contact-remove'
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
//Stateless functional component
//ES6 rendering of functional componet
// const ListContacts = props => (
//   <ol className='contact-title'>
//     {props.contacts.map(contact => (
//       <li key={contact.id} className='contact-list-item'>
//         <div
//           className='contact-avatar'
//           style={{
//             backgroundImage: `url(${contact.avatarURL})`
//           }}
//         ></div>
//         <div className='contact-details'>
//           <p>{contact.name}</p>
//           <p>{contact.handle}</p>
//         </div>
//         <button
//           onClick={() => props.onDeleteContact(contact)}
//           className='contact-remove'
//         >
//           Remove
//         </button>
//       </li>
//     ))}
//   </ol>
// );

// function ListContacts(props) {
//   console.log('PROPS', props);
//   return (
//     <ol className='contact-title'>
//       {props.contacts.map(contact => (
//         <li key={contact.id} className='contact-list-item'>
//           <div
//             className='contact-avatar'
//             style={{
//               backgroundImage: `url(${contact.avatarURL})`
//             }}
//           ></div>
//           <div className='contact-details'>
//             <p>{contact.name}</p>
//             <p>{contact.handle}</p>
//           </div>
//           <button className='contact-remove'>Remove</button>
//         </li>
//       ))}
//     </ol>
//   );
// }

// ListContacts.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDeleteContact: PropTypes.func.isRequired
// };
export default ListContacts;
