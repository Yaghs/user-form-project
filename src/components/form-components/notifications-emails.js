// component for the notifications
//they only send an alert
//<button onClick={HandleHospitalNotifications}>X</button>
export function HospitalContacts() {
    function HandleHospitalNotifications() {
      return alert("Hospital Notified");
    }
    return (
      <div>
        <p>Hospital Contacts</p>
        <input type="checkbox" onChange={HandleHospitalNotifications} />
      </div>
    );
  }
  
  export function CompanyContacts() {
    function HandleComapnyContacts() {
      return alert("Company notified");
    }
    return (
      <div>
        <p>Company Contacts</p>
        <input type="checkbox" onChange={HandleComapnyContacts} />
      </div>
    );
  }
  
  export function Restock() {
    function HandleRestockNotifications() {
      return alert("Restock notification sent");
    }
    return (
      <div>
        <p>Restock</p>
        <input type="checkbox" onChange={HandleRestockNotifications} />
      </div>
    );
  }
  