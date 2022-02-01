import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="loader">
      <span className="loader__column"/>
      <span className="loader__column"/>
      <span className="loader__column"/>
      <span className="loader__column"/>
      <span className="visually-hidden">Загрузка...</span>
    </div>
  );
}

export default Spinner;
