import React from 'react';
import MaterialTable from 'material-table';
import keyword from "./keyword"

export default function KeywordTable(props) {
  const MAX_WORDS= 10 ;
  const [state, setState] = React.useState({
    columns: [
      { title: 'Category', field: 'category' },
      { title: 'Keywords', field: 'keywords' },
    ],
    data: [
      {category : "cars" , keywords : "audi, bmw, tires "},
      {category : "bikes" , keywords : "bianchi "},
      {category : "fruit" , keywords : "banana, avocado "},
      {category : "animals" , keywords : "cat, dog, otter "},
    //  {category : "drinks" , keywords : "tea, water "},
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
            //setTimeout(() => {
              resolve();
              keyword.getKeyword(newData.category , MAX_WORDS) 
                .then((response)=>{
  
                  
                  setState(prevState => {
                    var data = [...prevState.data];
                    var words = response.data.keywords.map(function(val) {
                      return val.word;
                    }).join(' , ');
                    (newData.keywords) ? newData.keywords += words : newData.keywords = words 
                    data.push(newData);
                    return { ...prevState, data };
                  });

                })
              
            //}, 600);
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