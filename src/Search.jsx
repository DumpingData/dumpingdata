import "./Search.css"
import { BiSearch } from 'react-icons/bi'
import logo from "./export.jpg"
import React, { useEffect, useRef, useState } from 'react'
import UserData from "./UserData"



const Search = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState("")
  const [ivalue, setValue] = useState("")
  const [currentPage , setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const type = useRef()

  const recordPerPage = 20;
  const lastIndex = currentPage * recordPerPage
  const firstindex = lastIndex - recordPerPage
  const records = data.slice(firstindex, lastIndex)
  const npages = Math.ceil(data.length / recordPerPage)
  const numbers = [...Array(npages+1).keys()].slice(1)


  

  // const pagination = paginationFactory({
  //   page: 1,
  //   sizePerPage: 10,
  //   lastPageText: ">>",
  //   firstPageText: "<<",
  //   nextPageText: ">",
  //   prePageText: "<",
  //   showTotal: true,
  //   alwaysShowAllBtns: true,
  //   onPageChange: function (page, sizePerPage) {
      
  //   },
  //   onSizePerPageChange: function (page, sizePerPage) {
  //     console.log("page", page)
  //     console.log("sizeperpage", sizePerPage)
  //   }

  // })


  useEffect(() => {
    filter && fetch(`https://iiwqh7z69h.execute-api.ap-south-1.amazonaws.com/filterImportData?${ivalue}=${filter}`)
      .then(res => res.json())
      .then(da => {

        setData(da.responce)
      })
      .catch(err => console.log(err))
  }, [filter , currentPage])

  function prePage(){
    if (currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  }

  function nextPage(){
    if(currentPage !== npages){
      setCurrentPage(currentPage+1)
    }
  }

  function changeCPage(id){
    setCurrentPage(id)
  }


  return (

    <>


      <div className="search_div " style={{ height: "35vh", backgroundImage: `url(${logo})` }}>
        <div className="mt-3">
          <h1 className="d-flex align-items-center justify-content-center  text-white" >Search Import Export Data Of India</h1>
        </div>
        <div className="radioBtn d-flex align-items-center justify-content-center ">

          <input className=" fs-1 text-white " type="radio" value="HSN_Code" name="data" onChange={e => setValue(e.target.value)} />HSN_Code
          <input className="fs-1 text-white" type="radio" value="Supplier_Name" name="data" onChange={e => setValue(e.target.value)} />Supplier_Name

        </div>
        <div className='search'>
          {/* <select className="bg-warning text-white text-bold m-0 p-0" style={{ height: "8vh", width: "6vw", borderRadius: "10px" }} ref={type}>
            <option value="HSN_Code">HSN_Code</option>
            <option value="Supplier_Name">Supplier_Name</option>
          </select> */}
          <input className="search fs-1S" type='text' placeholder='Enter HSN Code/Supplier_Name' onChange={e => setFilter(e.target.value)} />
          <button type="submit" value='search' style={{ height: "9vh", width: "6vw", borderRadius: "10px" }} className="bg-warning text-white fs-1 m-0 p-0">Search</button>
        </div>
      </div>

      <div className=" mt-3 d-flex align-items-center justify-content-center ">
        <div className=" box_data  " style={{ height: "30vh", borderRadius: "20px" }}>
          <div className="m-3">
            <h1>Detailed Import Data of {data.length}</h1>
          </div>
          <div className="row" >
            <div className="col small d-flex align-items-center justify-content-center " style={{ height: "20vh", borderRadius: "20px" }}>
              <div className="">
                <h1 className="d-flex justify-content-center  ">5,150</h1>
                <h4>Import Shipment Records found</h4>
              </div>
            </div>
            <div className="col small d-flex align-items-center justify-content-center" style={{ height: "20vh", borderRadius: "20px" }}>
              <div className="">
                <h2>Detailed Analysis & Trends of:</h2>
                <h2 className="d-flex justify-content-center">456</h2>
                <div className="bg-primary text-white">
                  <h2 className="d-flex align-items-center justify-content-center">Click to view</h2>
                </div>
              </div>
            </div>
            <div className="col small  d-flex align-items-center justify-content-center" style={{ height: "20vh", borderRadius: "20px" }}>
              <div>
                <h2>Customs Import Duty of:</h2>
                <h2 className="d-flex justify-content-center">34456</h2>
                <div className="bg-primary text-white">
                  <h2 className="d-flex align-items-center justify-content-center w-100">Click to view</h2>
                </div>
              </div>
            </div>
            <div className="col small d-flex align-items-center justify-content-center " style={{ height: "20vh", borderRadius: "20px" }}>
              <div>
                <h2>Trademarks on this page</h2>
                <div className="bg-primary text-white">
                  <h2 className="d-flex align-items-center justify-content-center">Click to view</h2>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {
        data.length && <div className="result">
          <table>

            <thead>
              <tr>
                <th scope="col">Bill_of_Entry_Date</th>
                <th scope="col">Importer_Name</th>
                <th scope="col">HSN_Code</th>
                <th scope="col">Product_Description</th>
                <th scope="col">Supplier_Name</th>
                <th scope="col">Supplier_Country</th>
                <th scope="col">Unit_Rate_in_FC</th>
                <th scope="col">Total_Rate_in_FC</th>
                <th scope="col">Unit</th>
                <th scope="col">Currency</th>
              </tr>
            </thead>


            <tbody>
              <UserData data={records} />
            </tbody>

          </table>

          


          <nav className="d-flex justify-content-end">
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prePage}>Prev</a>
              </li>
              {
                numbers.map((n,i)=>(
                  <li className={`page-item ${currentPage === n ? "active" : ''}`} key={i}>
                    <a href="#" className="page-link" onClick={()=>changeCPage(n)}>{n}</a>
                  </li>
                ))
              }

              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>Next</a>
              </li>

            </ul>
          </nav>

        </div>
      }

    </>
  )

}

export default Search
