import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import Add from './Add';
import Edit from './Edit';

function Form() {
    const [List, setList] = useState([])
    const [showAddModal, setshowAddModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState({})
    const [selectedCertificateIndex, setSelectedCertificateIndex] = useState('')

    //Add 
    let updateShowAddModal = () => {
        setshowAddModal(true)
    }
    let hideShowAddModal = () => {
        setshowAddModal(false);
    };

    let updateList = (certificate) => {

        let certificateCopy = [...List]
        certificateCopy.push(certificate)
        setList(certificateCopy)
        alert("Added Successfully")
    }

    //Edit Certificate
    let updateCertificateAfterEdit = async (certificate) => {
        let certificateCopy = [...List]
        certificateCopy.splice(selectedCertificateIndex, 1, certificate)
        setList(certificateCopy)
        setSelectedCertificateIndex('')
        setshowEditModal(false)
        alert("Updated Successfully")
    }
    let updateShowEditModal = (certificate, index) => {
        setshowEditModal(true)
        setSelectedCertificateIndex(index)
        setSelectedCertificate(certificate)
    }
    let hideShowEditModal = () => {
        setshowEditModal(false)
    }

    let deleteCertificate = (index) => {
        if (window.confirm('Are you sure to Delete?')) {
            let certificateCopy = [...List]
            certificateCopy.splice(index, 1)
            setList(certificateCopy)
        }
    }


    return (
        <div>
            <Table striped hover>
                <thead className='border-bottom'>
                    <tr>
                        <th>Id</th>
                        <th>Cirtification Name</th>
                        <th>Cirtification From</th>
                        <th>YearofCompletion</th>
                        <th>
              <button className="btn btn-warning" onClick={updateShowAddModal}>
                ADD
              </button>
            </th>
                    </tr>
                </thead>
                <tbody>
                    {List.length > 0 ? List.map((person, idx) => {
                        return <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{person.certificateName}</td>
                            <td>{person.certifiedBy}</td>
                            <td>{person.yearOfCompletion}</td>
                            <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => updateShowEditModal(person, idx)}
                    >
                      Edit
                    </button>
                   <button
                      className="btn btn-danger"
                      onClick={() => deleteCertificate(idx)}>
                    
                      Delete
                    </button>
                  </td>
                            
                        </tr>
                    })
                        : <tr>
                            <td></td>
                            <td></td>
                            <td className="emptyList"></td>
                            <td></td>
                            <td></td></tr>}


                </tbody>
            </Table>

            <Add
            showAddModal={showAddModal}
                hideShowAddModal={hideShowAddModal}
                updateList={updateList}
            />

            <Edit showEditModal={showEditModal}
                hideShowEditModal={hideShowEditModal}
                updateCertificateAfterEdit={updateCertificateAfterEdit}
                selectedCertificate={selectedCertificate}
            />
        </div>
    )
}

export default Form