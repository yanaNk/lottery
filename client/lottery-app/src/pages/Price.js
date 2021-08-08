import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Price({price}){
  var priceOptions;

  if (price != null) {
    if(typeof(price) == "number"){
        priceOptions= <option key={"money"} value={"key"}>
        {"money"}:{price}
      </option>
    }
    else {
    priceOptions = Object.entries(price).map(([key, value], i) => (
      <option key={i} value={key}>
        {key}:{value}
      </option>
    ));  
    }
  }

  return (
    <Typography component={"div"} gutterBottom>
        Price :
      {priceOptions}
    </Typography>
  );
}
