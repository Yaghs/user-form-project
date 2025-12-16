export default function Success({responseData}) {
    console.log("success");
    /*
    MOCK DATA
   const responseData = {
        billsheets: [
            {
                id: 1,
                file: {name: "test.jpg"},
                company: "test",
                amount: 100
            }
        ],
        surgeryDate: "2025-01-01",
        patientName: "test",
        repNotes: "test",
        physician: "test",
        hospital: "test"
    }
    */
    //TODO: add the data taken from the form to the response data including the billsheets
    return (
        <div>
          <h2>case summary</h2>{" "}
          {responseData && responseData.billsheets.map((billsheet) => (
            <ul key={billsheet.id}>
              {" "}
              <li>image: {billsheet.file.name} </li>
              <li>company: {billsheet.company}</li>{" "}
              <li>amount: {billsheet.amount}</li>{" "}
            </ul>
          ))}{" "}
          <ul>
            <li>DOS: {responseData.surgeryDate}</li>{" "}
            <li>Patient name: {responseData.patientName}</li>{" "}
            <li>rep Notes: {responseData.repNotes}</li>{" "}
            <li>Physician: {responseData.physician}</li>
            <li>Hospital: {responseData.hospital}</li>
          </ul>{" "}
        </div>
    )
}

/**
 * 
 * 
 * {responseData.billsheets.map((billsheet) => (
            <ul key={billsheet.id}>
              {" "}
              <li>image: {responseData.billsheet.file.name} </li>
              <li>company: {responseData.billsheet.company}</li>{" "}
              <li>amount: {responseData.billsheet.amount}</li>{" "}
            </ul>
          ))}{" "}
          <ul>
            <li>DOS: {responseData.surgeryDate}</li>{" "}
            <li>Patient name: {responseData.patientName}</li>{" "}
            <li>rep Notes: {responseData.repNotes}</li>{" "}
            <li>Physician: {responseData.physician}</li>
            <li>Hospital: {responseData.hospital}</li>
          </ul>{" "}
 */