// imports the drop downs to form
import {
    CompanyDropdown,
    HospitalDropDown,
    PhysicianDropDown,
  } from "./form-components/dropdowns";
  //imports the notification emails to form
  import {
    HospitalContacts,
    CompanyContacts,
    Restock,
  } from "./form-components/notifications-emails";
  import formSubmit from "../api/formSubmit";
  import { Modal } from "./form-components/loading";
  import Success from "./success";
  import Error from "./Error";
  import AIExtractionMock from "../api/formSubmitApiMock";
  //imports useState and useRef
  import { useState } from "react";
  export default function SaveCaseForm() {
   //initializes the state with default values
    const [billsheets, setBillSheets] = useState([]);
    const [showLoadingState, setShowLoadingState] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [showSuccessState, setShowSuccessState] = useState(false);
    const [showSummaryState, setShowSummaryState] = useState(false);
    const [showErrorState, setShowErrorState] = useState(false);
    const [formData, setFormData] = useState({
      surgeryDate: new Date().toISOString().split("T")[0],
      patientName: "",
      repNotes: "",
      hospital: "",
      physician: "",
    });
    const [nextId, setNextID] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
  
    //event handler for typing the values using id, name and value as arguments
    function handleBillsheetChange(id, name, value) {
  
      // calls the setter
      setBillSheets(
        //iterates through the billsheets list and creates a new copy
        billsheets.map((billsheet) => {
          if (billsheet.id === id) {
            // creates a copy of the object and updates the name property with value
            return { ...billsheet, [name]: value };
          } else {
            //default return statement
            return billsheet;
          }
        })
      );
    }
    //event handler for creating new billsheets for the case
    function handleBillsheetClick() {
      //initializes the variables for the image
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = true;
      input.accept = "image/*";
  
      //handles the upload by creating a new list with default values
      input.onchange = (e) => {
        const files = [...e.target.files];
  
        const newBillsheets = files.map((file, index) => ({
          id: nextId + index,
          company: "",
          amount: "",
          file: file,
        }));
        //calls the state setter for billsheets and ID to
        //store the new copy of the arrays as a snapshot
        //increment the index counter for the new billsheets
        setBillSheets([...billsheets, ...newBillsheets]);
        setNextID(nextId + files.length);
      };
  
      input.click();
    }
    //handles removing a billsheet from a case
    function RemoveBillsheetClick(id) {
      console.log("goodbye");
      //uses filter to iterate through the billsheets list and create a copy based on said conditions in the callback
      setBillSheets(billsheets.filter((billsheet) => billsheet.id !== id));
      //decrements the index count
      setNextID(nextId - 1);
    }
    const handleErrorState = () => {
      handleOpenLoadingState();
      setShowErrorState(true);
      handleCloseLoadingState();
      // stay on the form page
      return;
    }

    // stores the new data as a state
    function handleFormChange(e) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    //event handler for the mock extractions button
    async function handleMockExtractionsClick() {
      console.log("mock extractions button clicked");
      //call the mock API
      try {
        const response = await AIExtractionMock();
        console.log("response received:", response);

        if(response.success) {
          setBillSheets(currentBillsheets => currentBillsheets.map(billsheet => ({
            ...billsheet,
            company: response.data.company,
            amount: response.data.amount,
          })))
          setFormData({
            ...formData,
            patientName: response.data.patientName,
            hospital: response.data.hospital,
            physician: response.data.physician,
            repNotes: response.data.notes,
          })
        }
      } catch (error) {
        console.error("error receiving response", error);
        handleErrorState();
        return;
      }
    }
      //We pass a dummy file object to the response
    //event handler for the save case button
    function handleSaveClick() {
      console.log("save case button clicked");
      handleOpenLoadingState();
      //TODO: add the logic to submit the form data to the API
      const formDataToSubmit = {
        ...formData,
        billsheets: billsheets
      };

      formSubmit(formDataToSubmit).then((response) => {
        console.log("response received");
        setResponseData(response);
        setShowSuccessState(true);
        setShowLoadingState(false);
        setShowErrorState(false);
        setErrorData(null);
      }).catch((error) => {
        setErrorData(error);
        handleErrorState();
        return;
      });
    }
    
    const handleOpenLoadingState = () => {
      console.log("modal opened");
      setShowLoadingState(true);
    }
    const handleCloseLoadingState = () => {
      console.log("modal closed");
      setShowLoadingState(false);
    }


    if(responseData !== null) {
      return(
        <Success responseData={responseData} />
      )
    }
    else {
        return (
          <div className="App">
            <button type="button" onClick={handleBillsheetClick}>
              Add bill sheets here
            </button>
            <button type="button" onClick={handleMockExtractionsClick}>
              Mock extractions{" "}
            </button>
            {billsheets.map((billsheet) => (
              <fieldset key={billsheet.id}>
                <form>
                  {billsheet.file && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(billsheet.file)}
                        alt={billsheet.file.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginRight: "8px",
                        }}
                      />
                      <span>{billsheet.file.name}</span>
                    </div>
                  )}
      
                  <CompanyDropdown
                    name="company"
                    value={billsheet.company}
                    onChange={(e) =>
                      handleBillsheetChange(
                        billsheet.id,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                  <label>amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={billsheet.amount}
                    onChange={(e) =>
                      handleBillsheetChange(
                        billsheet.id,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => RemoveBillsheetClick(billsheet.id)}
                  >
                    remove billsheet
                  </button>
                </form>
              </fieldset>
            ))}
            <fieldset>
              <label>Date of surgery</label>
              <input
                type="date"
                name="surgeryDate"
                value={formData.surgeryDate}
                onChange={handleFormChange}
              ></input>
              <HospitalDropDown
                name="hospital"
                value={formData.hospital}
                onChange={handleFormChange}
              />
              <label>Patient Name</label>
              <input
                name="patientName"
                value={formData.patientName}
                onChange={handleFormChange}
              ></input>
              <br />
              <label>Rep Notes</label>
              <input
                name="repNotes"
                value={formData.repNotes}
                onChange={handleFormChange}
              ></input>
            </fieldset>
      
            <fieldset>
              <PhysicianDropDown
                name="physician"
                value={formData.physician}
                onChange={handleFormChange}
              />
              <fieldset>
                <label>Notification emails</label>
                <HospitalContacts />
                <CompanyContacts />
              </fieldset>
              <fieldset>
                <Restock />
              </fieldset>
              <button onClick={handleSaveClick}>Save Case</button>
              <Modal isOpen={showLoadingState} onClose={handleCloseLoadingState}>
                {showErrorState ? (<Error />) : 
                (
                   <div>
                    <h2>loading...</h2>
                    <p>please wait while we process your request...</p>
                   </div>
                )}
              </Modal>
              <button>discard</button>
            </fieldset>
          </div>
        );
      }
    }
    // if the condition inside the setShowSummary state is true
    //return the following:
  
    // the list values for the individual billsheets (uses the .map tool)
    //the case wide values for the case
    /*if (showSummary) {
      return (
        <div>
          <h2>case summary</h2>{" "}
          {billsheets.map((billsheet) => (
            <ul key={billsheet.id}>
              {" "}
              <li>image: {billsheet.file.name} </li>
              <li>company: {billsheet.company}</li>{" "}
              <li>amount: {billsheet.amount}</li>{" "}
            </ul>
          ))}{" "}
          <ul>
            <li>DOS: {formData.surgeryDate}</li>{" "}
            <li>Patient name: {formData.patientName}</li>{" "}
            <li>rep Notes: {formData.repNotes}</li>{" "}
            <li>Physician: {formData.physician}</li>
            <li>Hospital: {formData.hospital}</li>
          </ul>{" "}
        </div>
      );
    }
      **/
  