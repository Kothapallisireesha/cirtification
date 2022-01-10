import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import React, { useCallback, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';


function Add({ showAddModal, hideShowAddModal, updateList }) {
  

    const [certificate, setCertificate] = useState({
        certificateName: '',
        certifiedBy: '',
        yearOfCompletion: ''
    });
    let validationSchema = yup.object().shape({
        
      })
   // const [errors, setErrors] = useState({
     //   NameError: '',
      //  CertifiedByError: '',
       // YOCError: '',
   // })
  
   // const validateName = useCallback(
       // () => {
         //   if (certificate.certificateName) {
           //     if (certificate.certificateName.length < 5) {
             //       setErrors({
               //         ...errors,
                 //       NameError: 'minimum 5 characters is required'
                   // })
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
     //   if (certificate.certifiedBy) {
       //     if (certificate.certifiedBy.length < 5) {
         //       setErrors({
           //         CertifiedByError: ' minimum of 5 characters is required'
             //   })
            //}
            //else{return true}
        //}
        //else {
          //  setErrors({
            //    CertifiedByError: 'Required'
            //})
        //}
    //}
    //const validateYOC = () => {
      //  if (certificate.yearOfCompletion) {
        //    if (!(certificate.yearOfCompletion > 1950 && certificate.yearOfCompletion < 2020)) {
          //      setErrors({
            //        YOCError: '1951-2020'
              //  })
                //return false;
            //}
            //else{return true}
        //}
        //else {
          //  setErrors({
            //    YOCError: ' Required'
            //})
            //return false;
        //}
    //}

    let handleClose = () => {
        hideShowAddModal()
    }

    let handleChange = (event) => {
        setCertificate({
            ...certificate,
            [event.target.name]: event.target.value
        })
    }

    let addCertificate = () => {
        validateName();
        validateCertifiedBy();
        validateYOC();
        if (validateName() && validateCertifiedBy() && validateYOC()) {
            updateList(certificate)
            setCertificate({
                certificateName: '',
                certifiedBy: '',
                yearOfCompletion: ''
            })
           // setErrors({
             //   NameError: '',
              //  CertifiedByError: '',
           //     YOCError: '',
           // })
        }
    }
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
    };


    return (
        <div>
            <Modal className="rounded-start" show={showAddModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title >Add Certification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                    >
                        {(props) => (
                            <Form>
                                <div>
                                    <label>Cirtification Name</label>
                                    <Field
                                        type="text"
                                        className="form-control mb-2"
                                        name="certificateName"
                                        placeholder='Enter Certificate Name'
                                        value={certificate.certificateName}
                                        autoComplete='off'
                                        onChange={handleChange}
                                    />
                                    {nameError && <div className='errMsg' style={{color:"red"}}>{nameError}</div>}
                                    <p className='error'><ErrorMessage name="Name" /></p>
                                </div>
                                <div>
                                    <label>Cirtification From</label>
                                    <Field
                                        type="text"
                                        className="form-control mb-2"
                                        name="certifiedBy"
                                        autoComplete='off'
                                        placeholder='Enter Certified From'
                                        value={certificate.certifiedBy}
                                        onChange={handleChange}
                                    />
                                    {certifiedError && <div className='errMsg' style={{color:"red"}}>{certifiedError}</div>}
                                    <p className='error'><ErrorMessage name="Certified_By" /></p>
                                </div>
                                <div>
                                    <label>YearOfCompletition</label>
                                    <Field
                                        type="number"
                                        className="form-control mb-2"
                                        name="yearOfCompletion"
                                        autoComplete='off'
                                        placeholder='Enter Year Of Completion'
                                        value={certificate.yearOfCompletion}
                                        onChange={handleChange}
                                    />
                                    {yearError && <div className='errMsg'style={{color:"red"}}>{yearError}</div>}
                                    <p className='error'><ErrorMessage name="YOC" /></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='btn-success' onClick={addCertificate} >
                        Add Certificate
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default React.memo(Add)