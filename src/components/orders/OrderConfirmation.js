import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OrderConfirmation = props => {
  const {
    organizationName,
    organizationWebsite,
    contactName,
    soapBarNum,
    contactPhone,
    contactEmail,
    address,
    country,
    beneficiariesNum,
    hygieneSituation,
    hygieneInitiative,
    comments,
  } = props.location.state.values;

  const { push } = useHistory();

  const confirmOrder = values => {
    console.log(props.location.state.values);
    axios
      .post(
        'http://98.242.245.160:8000/orders/qualify',
        props.location.state.values
      )
      .then(res => {
        console.log(res.data);
        if (res.data.checkIfPrice.hasPrice === true) {
          push({
            pathname: '/checkout',
          });
        } else {
          console.log('message');
        }
      })
      .catch(err => console.log(`Order confirmation error: ${err}`));
  };

  return (
    <>
      <h1>Order Confirmation</h1>
      <p>Organization Name: {organizationName}</p>
      <p>Organization Website: {organizationWebsite}</p>
      <p>Contact Name: {contactName}</p>
      <p>Number of Soap Bars Requested: {soapBarNum}</p>
      <p>Contact Phone: {contactPhone}</p>
      <p>Contact Email: {contactEmail}</p>
      <p>Address: {address}</p>
      <p>Country: {country}</p>
      <p>Number of Beneficiaries: {beneficiariesNum}</p>
      <p>Hygiene Situation: {hygieneSituation}</p>
      <p>Hygiene Initiative: {hygieneInitiative}</p>
      <p>Comments: {comments}</p>
      <button onClick={() => confirmOrder()}>Confirm Order</button>
    </>
  );
};

export default OrderConfirmation;
