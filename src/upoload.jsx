import React, { useEffect, useState } from 'react';
import axios from "axios"

const Upload = () => {
    
    const [file, setFile] = useState()
    const [upladFile, setUploadFile] = useState()
    const [currentValue, setValue] = useState("")
    console.log(currentValue)

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = `https://iiwqh7z69h.execute-api.ap-south-1.amazonaws.com/${currentValue}`
        const formData = new FormData()
        formData.append("file", file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(url, formData, config)
            .then((responce) => {
                setUploadFile(responce.data.file)
            })
            .catch(err => {
                console.log("error uploading file", err)
            })


    }


    return (
        <div className='container d-flex align-items-center justify-content-center'>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <h2 className='mt-3'>Upload Excel File</h2>
                    <div>
                        <input  type="radio" value="importData" name="data" onChange={e => setValue(e.target.value)} />Import Data
                        <input  type="radio" value="exportData" name="data" onChange={e => setValue(e.target.value)}/>Export Data
                    </div>
                    <input type='file' onChange={handleChange} /><br></br>
                    <button type='submit' className='mt-3 btn btn-primary'>Upload</button>
                </div>
            </form>
        </div>
    )
}

export default Upload