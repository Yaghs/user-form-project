import { CompanyDataOptions, HospitalDataOptions, PhysicianDataOptions } from '../../data/data';


// drop down menu for company, passes props as an argument
//returns the dropdown as jsx with the data from the array
//saves the data as the company name
export function CompanyDropdown(props) {
    return (
      <div>
        <label>company</label>
        <select {...props} name="company" id="company-select">
          <option value="">Select company</option>
          {CompanyDataOptions.map((company) => {
            return (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  
  // drop down menu for Hospital, passes props as an argument
  //returns the dropdown as jsx with the data from the array
  //saves the data as the Hospital name
  
  export function HospitalDropDown(props) {
    return (
      <div>
        <label>Hospital</label>
        <select {...props} name="hospital" id="hospital-select">
          <option value="">Select hospital</option>
          {HospitalDataOptions.map((hospital) => {
            return (
              <option key={hospital.id} value={hospital.name}>
                {hospital.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  // drop down menu for Physician, passes props as an argument
  //returns the dropdown as jsx with the data from the array
  //saves the data as the Physician name
  
  export function PhysicianDropDown(props) {
    return (
      <div>
        <label>Physician</label>
        <select {...props} name="physician" id="physician-select">
          <option value="">Select Physician</option>
  
          {PhysicianDataOptions.map((physician) => (
            <option key={physician.id} value={physician.name}>
              {physician.name}
            </option>
          ))}
        </select>
      </div>
    );
  }