import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ name: '', status: '' })

    const handleClick = val =>{
      setShow(val);
    }

    // handle input value changes
    const handleChange = e => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    // handle form submit
    const handleSubmit = e => {
      e.preventDefault();
      setItems([...items, formData])
    }

    // filter the items
    const filteredItems = () => {
      const activeItems = items.filter(item => item.status.toLowerCase() === 'active');
      const completedItems = items.filter(item => item.status.toLowerCase() === 'completed');
      const otherItems = items.filter(item => item.status.toLowerCase() !== 'active' && item.status.toLowerCase() !== 'completed');

      // console.log('active', activeItems);
      // console.log('completed', completedItems);

      // display the items
      switch (show) {
        case 'active':
          return [...activeItems]
        case 'completed':
          return [...completedItems]
        // logic is, first show active items, then completed & finally the others
        default:
          return [...activeItems, ...completedItems, ...otherItems]
      }
    }

    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
          <div className="col-6 ">
            <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Status"
                  name='status'
                  value={formData.status}
                  onChange={handleChange}
                />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>

          <div className="col-8">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
              </li>
              <li className="nav-item">
                <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
              </li>
            </ul>
            <div className="tab-content"></div>
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* display the items */}
                {
                  filteredItems()?.map((item, index) =>
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default Problem1;