import React from 'react';
import "./index.css";
import Select from 'react-select';

const Modal = (props) => {
  const countries = [
    { countryCode: 'br', label: 'Brasil' },
    { countryCode: 'us', label: 'Estados Unidos' },
    { countryCode: 'ca', label: 'Canadá' },
    { countryCode: 'jp', label: 'Japão' },
    { countryCode: 'ar', label: 'Argentina' },
    { countryCode: 'es', label: 'Espanha' },
    { countryCode: 'fr', label: 'França' },
    { countryCode: 'it', label: 'Italia' },
    { countryCode: 'nl', label: 'Holanda' },
    { countryCode: 'mx', label: 'Mexico' },
    { countryCode: 'pt', label: 'Portugal' },
    { countryCode: 'ru', label: 'Russia' },
  ];

  return (
    <div className={`modal ${props.isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <Select
          options={countries}
          placeholder="Where are you?" 
          onChange={(selectedOption) => {
            props.setSelectedCountry(selectedOption);
            props.onClose();
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
