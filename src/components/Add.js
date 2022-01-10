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
    const [errors, setErrors] = useState({
        NameError: '',
        CertifiedByError: '',
        YOCError: '',
    })

    const validateName = useCallback(
        () => {
            if (certificate.certificateName) {
                if (certificate.certificateName.length < 5) {
                    setErrors({
                        ...errors,
                        NameError: 'minimum 5 characters is required'
                    })
                }
                else{return true}
                
            }
            else {
                setErrors({
                    NameError: 'Required'
                })
                return false;
            }
        },
        [certificate.certificateName],
    )
    const validateCertifiedBy = () => {
        if (certificate.certifiedBy) {
            if (certificate.certifiedBy.length < 5) {
                setErrors({
                    CertifiedByError: ' minimum of 5 characters is required'
                })
            }
            else{return true}
        }
        else {
            setErrors({
                CertifiedByError: 'Required'
            })
        }
    }
    const validateYOC = () => {
        if (certificate.yearOfCompletion) {
            if (!(certificate.yearOfCompletion > 1950 && certificate.yearOfCompletion < 2020)) {
                setErrors({
                    YOCError: '1951-2020'
                })
                return false;
            }
            else{return true}
        }
        else {
            setErrors({
                YOCError: ' Required'
            })
            return false;
        }
    }

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
            setErrors({
                NameError: '',
                CertifiedByError: '',
                YOCError: '',
            })
        }
    }

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
                                    {errors.NameError && <div className='errMsg' style={{color:"red"}}>{errors.NameError}</div>}
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
                                    {errors.CertifiedByError && <div className='errMsg' style={{color:"red"}}>{errors.CertifiedByError}</div>}
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
                                    {errors.YOCError && <div className='errMsg'style={{color:"red"}}>{errors.YOCError}</div>}
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

export default Add