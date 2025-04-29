import React from 'react';
import {
  Modal,
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
import moh from '../images/moh.png';
import QRCode from 'react-qr-code';

const DataView = ({ isOpen, onClose, eventData }) => {
  if (!eventData) return null;

  const handleClose = () => {
    onClose?.();
  };

  const handlePrint = () => {
    window.print();
  };

  const getDataValue = (dataElementId) => {
    if (!eventData || !eventData.dataValues) return '-';
    const dataValue = eventData.dataValues.find(dv => dv.dataElement === dataElementId);
    return dataValue ? dataValue.value : '-';
  };

  const formatDate = (dateStr) => {
    return dateStr && dateStr !== '-' ? new Date(dateStr).toLocaleDateString() : '-';
  };

  const childName = getDataValue('ZVlvCTT6G4A');
  const sex = getDataValue('cJ1lAdSRdOn');
  const dob = formatDate(getDataValue('FQTIz54NLN4'));
  const timeOfBirth = getDataValue('yxqZmHDnCWf');

  const motherFullName = getDataValue('J9i1DFTGnpb');
  const motherNationality = getDataValue('Ej58X2a6ZBA');
  const fatherFullName = getDataValue('uh1CxrbOqfW');
  const fatherNationality = getDataValue('sn6kx28cLYb');

  const notifierNameInFull = getDataValue('QXjGgP1OGrP');
  const notifierOccupation = getDataValue('Fe9NLNTucAU');
  const notifierDate = formatDate(getDataValue('ZVvF8qK7skg'));

  const midwifeFullName = getDataValue('OCI82CIDA6X');
  const midwifeDate = formatDate(getDataValue('OLQWApHJ81N'));

  const facility = eventData.orgUnitName || eventData.orgUnit || '-';

  const qrData = {
    childName,
    sex,
    dob,
    motherFullName,
    motherNationality,
    fatherFullName,
    fatherNationality,
    facility,
    certificateVerifiedUrl: 'https://dev.southsudanhis.org',
  };

  const certificateStyle = {
    width: '148mm',
    minHeight: '210mm',
    margin: '0 auto',
    padding: '20mm',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    backgroundImage: `url(${moh})`,
    backgroundSize: '60%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 1,
  };

  return (
    <>
      {/* Print styles */}
      <style>
  {`
    @media print {
      body * {
        visibility: hidden;
      }

      #print-area, #print-area * {
        visibility: visible;
      }

      #print-area {
        position: absolute;
        top: 0;
        left: 0;
        width: 148mm;
        height: 210mm;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        page-break-after: always;

        /* Optional: center content and fit to page using scale */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transform: scale(1);
        transform-origin: top left;
      }

      .dhis2-ui-modal,
      .dhis2-ui-modal__scrim {
        display: none !important;
      }

      @page {
        size: A5 portrait;
        margin: 0;
      }

      html, body {
        width: 148mm;
        height: 210mm;
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  `}
</style>


      <Modal position="middle" hide={!isOpen} onClose={handleClose}>
        <ModalContent>
          <div id="print-area">
            <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '16px', fontSize: '12px' }}>
              <h1>
                Republic of South Sudan
                <br />
                Ministry of Health
                <br />
                <span>Birth Notification Certificate</span>
              </h1>
              <img src={moh} alt="Ministry of Health" style={{ display: 'block', margin: '10px auto', width: '100px' }} />
            </div>

            <Box padding="16px" style={{ ...certificateStyle, minHeight: 'auto' }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Child Name</strong></TableCell>
                    <TableCell>{childName}</TableCell>
                    <TableCell><strong>Sex</strong></TableCell>
                    <TableCell>{sex}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Time of Birth</strong></TableCell>
                    <TableCell>{timeOfBirth}</TableCell>
                    <TableCell><strong>Date of Birth</strong></TableCell>
                    <TableCell>{dob}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Facility</strong></TableCell>
                    <TableCell>{facility}</TableCell>
                    <TableCell><strong>Mother Name</strong></TableCell>
                    <TableCell>{motherFullName}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Mother Nationality</strong></TableCell>
                    <TableCell>{motherNationality}</TableCell>
                    <TableCell><strong>Father Name</strong></TableCell>
                    <TableCell>{fatherFullName}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell><strong>Father Nationality</strong></TableCell>
                    <TableCell>{fatherNationality}</TableCell>
                    <TableCell><strong>Notifier Name</strong></TableCell>
                    <TableCell>{notifierNameInFull}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <QRCode value={JSON.stringify(qrData)} size={128} fgColor="#000000" />
              </div>

              <Box textAlign="center" marginTop="16px">
                <p>
                  This Birth Notification is system-generated and does not require a signature. <br />
                  You can verify the certificate by scanning the QR code.
                </p>
              </Box>
            </Box>
          </div>
        </ModalContent>

        <ModalActions>
          <ButtonStrip end>
            <Button onClick={handlePrint}>Print</Button>
            <Button onClick={handleClose}>Close</Button>
          </ButtonStrip>
        </ModalActions>
      </Modal>
    </>
  );
};

export default DataView;
