
const keyword = {
  getKeyword : function (name , max){
    return new Promise (function(resolve , reject){
      fetch(
        process.env.REACT_APP_GQL_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
                query: `
                {keywords(  name : "${name}" , max : ${max}  )}
                  `
              })
        }
      )    
      .then(response => response.json())
      .then(data => resolve( data)  )
      .catch(err => reject(err))

    })
  }
}


export default keyword;
