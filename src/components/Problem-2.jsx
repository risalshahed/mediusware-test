import AllCountries from './AllCountries';
import USCountries from './USCountries';
import './Problem-2.css';


const Problem2 = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <AllCountries />
          <USCountries />
        </div>
      </div>
    </div>
  );
};

export default Problem2;