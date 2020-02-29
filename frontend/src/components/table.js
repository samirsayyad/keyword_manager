import React from 'react';
import MaterialTable from 'material-table';

export default function KeywordTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Category', field: 'category' },
      { title: 'Keywords', field: 'keywords' },
      
      
    ],
    data: [
      { category: 'cars', keywords: 'audi, bmw, tires' },
      { category: 'cars', keywords: 'audi, bmw, tires' },
      { category: 'cars', keywords: 'audi, bmw, tires' },
      
    ],
  });

  return (
    <MaterialTable
      options={{
        search: false,
        actionsColumnIndex: -1

      }}
      title="Manage Keywords & Categories"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}