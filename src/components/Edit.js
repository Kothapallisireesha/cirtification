import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import * as yup from 'yup';

function Edit({showEditModal,hideShowEditModal,updateCertificateAfterEdit,selectedCertificate}) {
    const [certificate, setCertificate] = useState({
        certificateName: '',
        certifiedBy: '',
        yearOfCompletion: ''
    });
 //   const [errors, setErrors] = useState({
   //     NameError: '',
     //   CertifiedByError: '',
       // YOCError: '',
    //})
    let validationSchema = yup.object().shape({
        
    })
    const [nameError, setnameError] = useState("")
    const validateName = () => {
        if (certificate.certificateName) {
            let regex = /^[a-zA-Z ]{4,30}$/;
            if (regex.test(certificate.certificateName)) {
                setnameError("");
                return true;
            }
            else {
                setnameError("Enter valid Name");
            }
        }
        else {
            setnameError("Name is Required");
        }
        return false;
    };
    const [certifiedError, setcertifiedError] = useState("")
    const validateCertifiedBy = () => {
        if (certificate.certifiedBy) {
            let regex = /^[a-zA-Z ]{4,30}$/;
            if (regex.test(certificate.certifiedBy)) {
                setcertifiedError("");
                return true;
            }
            else {
                setcertifiedError("enter valid Certfied Name");
            }
        }
        else {
            setcertifiedError("Certified Name is Required");
        }
        return false;
    };

    const [yearError, setyearError] = useState("")
    const  validateYOC = () => {
        if (certificate.yearOfCompletion) {
            let regex = /^(197\d|19[89]\d|20[01]\d|202[0-2])$/;
            if (regex.test(certificate.yearOfCompletion)) {
                setyearError("");
                return true;
            }
            else {
                setyearError("Enter Year between 1970 to 2022");
            }
        }
        else {
            setyearError("Year is Required");
        }
        return false;

    }
   // const validateName = useCallback(
     //   () => {
       //     if (certificate.certificateName) {
         //       if (certificate.certificateName.length < 5) {
           //         setErrors({
             //           ...errors,
               //         NameError: ' minimum of 5 characters is required'
                 //   })
                //}
                //else{return true}
                
            //}
            //else {
              //  setErrors({
                //    NameError: 'Required'
                //})
                //return false;
            //}
        //},
        //[certificate.certificateName],
    //)
    // const validateCertifiedBy = () => {
    //     if (certificate.certifiedBy) {
    //         if (certificate.certifiedBy.length < 5) {
    //             setErrors({
    //                 CertifiedByError: 'minimum of 5 characters is required'
    //             })
    //         }
    //         else{return true}
    //     }
    //     else {
    //         setErrors({
    //             CertifiedByError: 'Required'
    //         })
    //     }
    // }
    // const validateYOC = () => {
    //     if (certificate.yearOfCompletion) {
    //         if (!(certificate.yearOfCompletion > 1950 && certificate.yearOfCompletion < 2022)) {
    //             setErrors({
    //                 YOCError: ' 1951-2022'
    //             })
    //             return false;
    //         }
    //         else{return true}
    //     }
    //     else {
    //         setErrors({
    //             YOCError: 'Required'
    //         })
    //         return false;
    //     }
    // }

    useEffect(() => {
        setCertificate({...selectedCertificate})
    }, [selectedCertificate])

    let handleChange = (event) => {
        // console.log(event.target.value);
        setCertificate({
            ...certificate,
            [event.target.name]:event.target.value
        })
    }
    let handleClose = () => {
        hideShowEditModal()
    }

    let editCertificate=()=>{
        validateName();
        validateCertifiedBy();
        validateYOC();
        if (validateName() && validateCertifiedBy() && validateYOC()) {
        updateCertificateAfterEdit(certificate)
        setCertificate({
        certificateName: '',
        certifiedBy: '',
        yearOfCompletion: ''})
    }
    
    }

    return (
        <div>
            <Modal show={showEditModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title >Edit Certification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                        <label>Cirtification Name</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                name="certificateName"
                                placeholder='Enter Certificate Name'
                                value={certificate.certificateName}
                                onChange={handleChange}
                            />
                            {nameError && <div className='errMsg' style={{color:"red"}}>{nameError}</div>}
                        </div>
                        <div>
                            <label>Cirtification From</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                name="certifiedBy"
                                placeholder='Enter Certified From'
                                value={certificate.certifiedBy}
                                onChange={handleChange}
                            />
                            {certifiedError && <div className='errMsg'  style={{color:"red"}}>{certifiedError}</div>}
                        </div>
                        <div>
                            <label>YearOfCompletition</label>
                            <input
                                type="number"
                                className="form-control mb-2"
                                name="yearOfCompletion"
                                placeholder='Enter Year Of Completion'
                                value={certificate.yearOfCompletion}
                                onChange={handleChange}
                            />
                            {yearError && <div className='errMsg'  style={{color:"red"}}>{yearError}</div>}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='btn-success' onClick={editCertificate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default  React.memo(Edit)