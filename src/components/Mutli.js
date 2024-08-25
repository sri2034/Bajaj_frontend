import React from 'react';
import Select from 'react-select';

const Multi = ({ options, onChange }) => {
    return (
        <Select
            isMulti
            options={options}
            onChange={onChange}
        />
    );
};

export default Multi;
