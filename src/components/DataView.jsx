import React, { useRef } from 'react';
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  Button,
  ButtonStrip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
} from '@dhis2/ui';
import moh from '../images/moh.png'; // Import the image correctly

const DataView = ({ isOpen, onClose, eventData, dataElements }) => {
  // Return null if no eventData is provided
  if (!eventData) return null;

  // Reference for the certificate content
  const certificateRef = useRef(null);

  // Function to handle closing the modal
  const handleClose = () => {
    onClose?.(); // Optional chaining for safety
  };

  // Helper function to get data value by data element ID
  const getDataValue = (dataElementId) => {
    if (!eventData || !eventData.dataValues) return '-';
    const dataValue = eventData.dataValues.find(dv => dv.dataElement === dataElementId);
    return dataValue ? dataValue.value : '-';
  };

  // Get values for specific data elements
  const childName = getDataValue('ZVlvCTT6G4A');
  const sex = getDataValue('cJ1lAdSRdOn');
  const dob = getDataValue('FQTIz54NLN4');
  const motherFullName = getDataValue('J9i1DFTGnpb');
  const motherNationality = getDataValue('Ej58X2a6ZBA');
  const fatherFullName = getDataValue('uh1CxrbOqfW');
  const fatherNationality = getDataValue('sn6kx28cLYb');

  // Format date properly if it exists
  const formattedDob = dob !== '-' ? new Date(dob).toLocaleDateString() : '-';

  const titleStyle = {
    textAlign: 'center',
    width: '100%',
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '16px',
  };

  const imageStyle = {
    display: 'block',
    margin: '0 auto',
    width: '100px',  // Adjust the size as needed
    height: 'auto',
    marginTop: '10px',
  };

  return (
    <Modal position="middle" hide={!isOpen} onClose={handleClose}>
      <Box>
        <ModalTitle>
          <div style={titleStyle}>
            Republic of South Sudan <br /> Ministry of Health
            <br />
            Birth Notification Certificate
          </div>
        </ModalTitle>

        {/* Add Image below the Title */}
        <img src={moh} alt="Ministry of Health" style={imageStyle} /> {/* Use the imported image here */}

      </Box>

      <ModalContent>
        <Box padding="16px" ref={certificateRef}>
          {/* Information Display */}
          <Table>
            <TableBody>
              {/* First Line: Name of the Child and Sex */}
              <TableRow>
                <TableCell><strong>Child Name:</strong></TableCell>
                <TableCell>{childName}</TableCell>
                <TableCell><strong>Sex:</strong></TableCell>
                <TableCell>{sex}</TableCell>
              </TableRow>

              {/* Second Line: Date of Birth and Organization Unit */}
              <TableRow>
                <TableCell><strong>Date of Birth:</strong></TableCell>
                <TableCell>{formattedDob}</TableCell>
                <TableCell><strong>Facility:</strong></TableCell>
                <TableCell>{eventData.orgUnitName || eventData.orgUnit || '-'}</TableCell>
              </TableRow>

              {/* Third Line: Mother Full Name and Mother Nationality */}
              <TableRow>
                <TableCell><strong>Mother Name:</strong></TableCell>
                <TableCell>{motherFullName}</TableCell>
                <TableCell><strong>Mother Nationality:</strong></TableCell>
                <TableCell>{motherNationality}</TableCell>
              </TableRow>

              {/* Fourth Line: Father Full Name and Father Nationality */}
              <TableRow>
                <TableCell><strong>Father Name:</strong></TableCell>
                <TableCell>{fatherFullName}</TableCell>
                <TableCell><strong>Father Nationality:</strong></TableCell>
                <TableCell>{fatherNationality}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <Box textAlign="center" marginTop="16px">
            <div style={{ textAlign: 'center' }}>
              This Birth Notification is system-generated and does not require a signature. <br />
              You can verify the certificate by scanning the QR code.
            </div>
          </Box>

        </Box>
      </ModalContent>

      <ModalActions>
        <ButtonStrip end>
          {/* Close button */}
          <Button onClick={handleClose} primary>
            Close
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
};

export default DataView;
