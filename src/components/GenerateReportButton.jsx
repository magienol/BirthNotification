/* import React, { useState, useCallback } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import {
  DataTable,
  DataTableHead,
  DataTableRow,
  DataTableColumnHeader,
  DataTableBody,
  DataTableCell,
  DataTableFoot,
  Pagination,
  Button,
  NoticeBox,
  CircularLoader,
  Box
} from '@dhis2/ui';
import OrgUnitSelector from './OrgUnitSelector';
import PeriodButton from './PeriodButton';




const programId = 'UxeePXLdng7'; // Program ID, can be changed

const dataElements = [
  { id: 'ZVlvCTT6G4A', displayName: 'Name of the Child' },
  { id: 'cJ1lAdSRdOn', displayName: 'Sex' },
  { id: 'FQTIz54NLN4', displayName: 'Date of Birth' },
  { id: 'J9i1DFTGnpb', displayName: 'Mother Full Name' },
  { id: 'Ej58X2a6ZBA', displayName: 'Mother Nationality' },
  { id: 'uh1CxrbOqfW', displayName: 'Father Full Name' },
  { id: 'sn6kx28cLYb', displayName: 'Father Nationality' },
];

const GenerateReportButton = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orgUnit, setOrgUnit] = useState(null);
  const [period, setPeriod] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [isOrgUnitSelected, setIsOrgUnitSelected] = useState(false);

  const eventsQuery = {
    events: {
      resource: 'events',
      params: ({ page, pageSize, orgUnitId, startDate, endDate }) => ({
        program: programId,
        page: page,
        pageSize: pageSize,
        totalPages: true,
        orgUnit: orgUnitId,
        startDate: startDate,
        endDate: endDate,
        fields: 'event,eventDate,dataValues[dataElement,value],orgUnit,orgUnitName',
      }),
    },
  };

  const { loading, error, data, refetch } = useDataQuery(eventsQuery, { lazy: true });

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);
  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handleGenerateReport = () => {
    if (!orgUnit || !period) {
      return; // Button should be disabled anyway
    }
    
    setShowTable(true);
    refetch({
      page: currentPage,
      pageSize: pageSize,
      orgUnitId: orgUnit.id,
      startDate: period.startDate,
      endDate: period.endDate,
    });
  };

  const onOrgUnitSelected = () => {
    setIsOrgUnitSelected(true);
  };

  const handlePeriodSave = (selectedPeriod) => {
    setPeriod(selectedPeriod);
  };

  return (
    <Box padding="16px">
      <Box marginBottom="16px" display="flex" justifyContent="space-between" alignItems="center">
        <OrgUnitSelector setOrgUnit={setOrgUnit} onOrgUnitSelected={onOrgUnitSelected} />
        <PeriodButton onSave={handlePeriodSave} isOrgUnitSelected={isOrgUnitSelected} />
        <Button 
          onClick={handleGenerateReport} 
          primary 
          disabled={!orgUnit || !period}
        >
          Generate Report
        </Button>
      </Box>

      {showTable && (
        <Box>
          {loading && <CircularLoader />}
          {error && <NoticeBox error>ERROR: {error.message}</NoticeBox>}
          {data && !loading && (
            <Box>
              <DataTable>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableColumnHeader>Event Date</DataTableColumnHeader>
                    <DataTableColumnHeader>Org Unit</DataTableColumnHeader>
                    {dataElements.map(de => (
                      <DataTableColumnHeader key={de.id}>{de.displayName}</DataTableColumnHeader>
                    ))}
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {data.events.events && data.events.events.length > 0 ? (
                    data.events.events.map((event) => (
                      <DataTableRow key={event.event}>
                        <DataTableCell>{new Date(event.eventDate).toLocaleDateString()}</DataTableCell>
                        <DataTableCell>{event.orgUnitName || event.orgUnit}</DataTableCell>
                        {dataElements.map(de => (
                          <DataTableCell key={de.id}>
                            {event.dataValues.find(dv => dv.dataElement === de.id)?.value || '-'}
                          </DataTableCell>
                        ))}
                      </DataTableRow>
                    ))
                  ) : (
                    <DataTableRow>
                      <DataTableCell colSpan={2 + dataElements.length}>No events found for the selected criteria</DataTableCell>
                    </DataTableRow>
                  )}
                </DataTableBody>
                <DataTableFoot>
                  <DataTableRow>
                    <DataTableCell colSpan={2 + dataElements.length}>Total Events: {data.events.pager?.total || 0}</DataTableCell>
                  </DataTableRow>
                </DataTableFoot>
              </DataTable>
              {data.events.pager && (
                <Pagination
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  page={currentPage}
                  pageCount={Math.ceil((data.events.pager?.total || 0) / pageSize)}
                  pageSize={pageSize}
                  total={data.events.pager?.total || 0}
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GenerateReportButton;
*/

import React, { useState, useCallback } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import {
  DataTable,
  DataTableHead,
  DataTableRow,
  DataTableColumnHeader,
  DataTableBody,
  DataTableCell,
  DataTableFoot,
  Pagination,
  Button,
  NoticeBox,
  CircularLoader,
  Box,
} from "@dhis2/ui";
import OrgUnitSelector from "./OrgUnitSelector";
import PeriodButton from "./PeriodButton";
import DataView from "./DataView";

const programId = "UxeePXLdng7"; // Program ID, can be changed

const dataElements = [
  { id: "ZVlvCTT6G4A", displayName: "Name of the Child" },
  { id: "cJ1lAdSRdOn", displayName: "Sex" },
  { id: "FQTIz54NLN4", displayName: "Date of Birth" },
  { id: "J9i1DFTGnpb", displayName: "Mother Full Name" },
  { id: "Ej58X2a6ZBA", displayName: "Mother Nationality" },
  { id: "uh1CxrbOqfW", displayName: "Father Full Name" },
  { id: "sn6kx28cLYb", displayName: "Father Nationality" },
];

const GenerateReportButton = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orgUnit, setOrgUnit] = useState(null);
  const [period, setPeriod] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [isOrgUnitSelected, setIsOrgUnitSelected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDataViewOpen, setIsDataViewOpen] = useState(false);

  const eventsQuery = {
    events: {
      resource: "events",
      params: ({ page, pageSize, orgUnitId, startDate, endDate }) => ({
        program: programId,
        page: page,
        pageSize: pageSize,
        totalPages: true,
        orgUnit: orgUnitId,
        startDate: startDate,
        endDate: endDate,
        fields:
          "event,eventDate,dataValues[dataElement,value],orgUnit,orgUnitName",
      }),
    },
  };

  const { loading, error, data, refetch } = useDataQuery(eventsQuery, {
    lazy: true,
  });

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);
  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handleGenerateReport = () => {
    if (!orgUnit || !period) {
      return; // Button should be disabled anyway
    }

    setShowTable(true);
    refetch({
      page: currentPage,
      pageSize: pageSize,
      orgUnitId: orgUnit.id,
      startDate: period.startDate,
      endDate: period.endDate,
    });
  };

  const onOrgUnitSelected = () => {
    setIsOrgUnitSelected(true);
  };

  const handlePeriodSave = (selectedPeriod) => {
    setPeriod(selectedPeriod);
  };

  const handleRowClick = (event) => {
    setSelectedEvent(event);
    setIsDataViewOpen(true);
  };

  const closeDataView = () => {
    setIsDataViewOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "flex-start",
        minWidth: "150vh",
        maxWidth: "180vh",
        marginTop: "20px",
      }} // You can move the styles into a css module file instead of inline stylying
    >
      {" "}
      {/*  Replaced the Box with div as Box is a DHIS2 UI component that only acts as an
      empty container and cant be styled */}
      <OrgUnitSelector
        setOrgUnit={setOrgUnit}
        onOrgUnitSelected={onOrgUnitSelected}
      />
      <PeriodButton
        onSave={handlePeriodSave}
        isOrgUnitSelected={isOrgUnitSelected}
      />
      <Button
        onClick={handleGenerateReport}
        primary
        disabled={!orgUnit || !period}
      >
        Generate Report
      </Button>
      {showTable && (
        <Box>
          {loading && <CircularLoader />}
          {error && <NoticeBox error>ERROR: {error.message}</NoticeBox>}
          {data && !loading && (
            <Box>
              <DataTable>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableColumnHeader>Event Date</DataTableColumnHeader>
                    <DataTableColumnHeader>Org Unit</DataTableColumnHeader>
                    {dataElements.map((de) => (
                      <DataTableColumnHeader key={de.id}>
                        {de.displayName}
                      </DataTableColumnHeader>
                    ))}
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {data.events.events && data.events.events.length > 0 ? (
                    data.events.events.map((event) => (
                      <DataTableRow
                        key={event.event}
                        onClick={() => handleRowClick(event)}
                        style={{ cursor: "pointer" }}
                      >
                        <DataTableCell>
                          {new Date(event.eventDate).toLocaleDateString()}
                        </DataTableCell>
                        <DataTableCell>
                          {event.orgUnitName || event.orgUnit}
                        </DataTableCell>
                        {dataElements.map((de) => (
                          <DataTableCell key={de.id}>
                            {event.dataValues.find(
                              (dv) => dv.dataElement === de.id
                            )?.value || "-"}
                          </DataTableCell>
                        ))}
                      </DataTableRow>
                    ))
                  ) : (
                    <DataTableRow>
                      <DataTableCell colSpan={2 + dataElements.length}>
                        No events found for the selected criteria
                      </DataTableCell>
                    </DataTableRow>
                  )}
                </DataTableBody>
                <DataTableFoot>
                  <DataTableRow>
                    <DataTableCell colSpan={2 + dataElements.length}>
                      Total Events: {data.events.pager?.total || 0}
                    </DataTableCell>
                  </DataTableRow>
                </DataTableFoot>
              </DataTable>
              {data.events.pager && (
                <Pagination
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  page={currentPage}
                  pageCount={Math.ceil(
                    (data.events.pager?.total || 0) / pageSize
                  )}
                  pageSize={pageSize}
                  total={data.events.pager?.total || 0}
                />
              )}
            </Box>
          )}
        </Box>
      )}
      <DataView
        isOpen={isDataViewOpen}
        onClose={closeDataView}
        eventData={selectedEvent}
        dataElements={dataElements}
      />
    </div>
  );
};

export default GenerateReportButton;
