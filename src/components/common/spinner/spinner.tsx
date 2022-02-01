import './spinner.css';

type Props = {
  marginTop?: number | string;
}

function Spinner({marginTop = '0'}: Props): JSX.Element {
  return (
    <div className="loader" style={{marginTop: marginTop ? marginTop : 0}}>
      <span className="loader__column"/>
      <span className="loader__column"/>
      <span className="loader__column"/>
      <span className="loader__column"/>
      <span className="visually-hidden">Загрузка...</span>
    </div>
  );
}

export default Spinner;
