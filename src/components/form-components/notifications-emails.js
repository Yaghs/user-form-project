// component for the notifications
//they only send an alert
export function HospitalContacts() {
    function HandleHospitalNotifications() {
      return alert("Hospital Notified");
    }
    return (
      <div>
        <p>Hospital Contacts</p>
        <button onClick={HandleHospitalNotifications}>X</button>
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
        <button onClick={HandleComapnyContacts}>X</button>
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
        <button onClick={HandleRestockNotifications}>X</button>
      </div>
    );
  }
  