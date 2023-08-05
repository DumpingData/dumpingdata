import React from 'react'

const UserData = ({ data }) => {
  return (
    <>
      {
         data?.map((i, j) => {
          console.log(i)

          const { Bill_of_Entry_Date,Importer_Name, HSN_Code, Product_Description, Supplier_Name, Supplier_Country,Unit_Rate_in_FC, Total_Rate_in_FC, Unit, Currency } = i

          return (
            <tr key={j}>
              <td>{Bill_of_Entry_Date}</td>
              <td>{Importer_Name}</td>
              <td>{HSN_Code}</td>
              <td>{Product_Description}</td>
              <td>{Supplier_Name}</td>
              <td>{Supplier_Country}</td>
              <td>{Unit_Rate_in_FC}</td>
              <td>{Total_Rate_in_FC}</td>
              <td>{Unit}</td>
              <td>{Currency}</td>
            </tr>
          )
        })
      }
    </>


  )
}

export default UserData