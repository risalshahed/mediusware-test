import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div>
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="warning" />
      <Spinner animation="border" variant="danger" />
    </div>
  );
}

export default Loading;