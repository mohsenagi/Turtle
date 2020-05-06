import React, { useRef, useState } from "react";

function UploadForm(props) {
  const [message, setmessage] = useState("");
  const selectedFile = useRef(null);

  const apiUrls = {
    development: "http://127.0.0.1:5000/", // npm start
    production: ""
  };
  let baseUrl = apiUrls[process.env.NODE_ENV];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile.current.files[0]) {
      const formData = new FormData();
      formData.append( 
        "file", 
        selectedFile.current.files[0],
        selectedFile.current.files[0].name
      );
      try {
        const response = await fetch(baseUrl + "uploader", {
          method: 'POST',
          body: formData
        });
        let result = await response.json();
        result.status = response.status;
        result.statusText = response.statusText;
        if (result.status === 200){
          props.updatePoints(result.locationHistory, result.duplicates);
          setmessage('Uploaded Successfully');
          selectedFile.current.value = null;
          setTimeout(() => {
            setmessage("");
          }, 2000);
        };
        if (result.status === 400) {
          alert(result.msg);
        };
      } catch (error) {
          console.log(error);
      };
    };
  };
  return (
      <div className="container">
          <form onSubmit={handleSubmit}>
              <div className="form-group files">
                <label>upload your single txt file to see the path</label>
                <input ref={selectedFile} type="file" className="form-control"/>
              </div>
              <button type="submit" className="btn btn-success">Upload</button>
              <p>{message}</p>
          </form>
      </div>
  );
};
  
export {UploadForm};
  