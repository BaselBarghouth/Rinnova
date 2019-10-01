import React from "react";
import { MDBInput, MDBFormInline } from "mdbreact";

const InputPage = () => {
  return (
    <div>
      <MDBFormInline>
        <MDBInput label="1" type="checkbox" id="checkbox1" />
      </MDBFormInline>
    </div>
  );
};

export default InputPage;
