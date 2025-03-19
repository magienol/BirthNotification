import React, { useState } from "react";
import { Button, ButtonStrip, Card } from "@dhis2/ui";

const PeriodButton = ({ onSave, isOrgUnitSelected }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDatesVisible, setIsDatesVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const currentDate = new Date().toISOString().split("T")[0];

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSave = () => {
    if (startDate && endDate) {
      const period = { startDate, endDate };
      setSelectedPeriod(period);
      if (onSave) {
        onSave(period);
      }
    }
    setIsDatesVisible(false);
  };

  const handleCancel = () => {
    setIsDatesVisible(false);
  };

  const toggleDatesVisibility = () => {
    setIsDatesVisible((prevState) => !prevState);
  };

  return (
    <div>
      <Button
        onClick={toggleDatesVisibility}
        disabled={!isOrgUnitSelected}
        secondary
      >
        {selectedPeriod
          ? `${selectedPeriod.startDate} to ${selectedPeriod.endDate}`
          : "Select Period"}
      </Button>

      {isDatesVisible && (
        <Card>
          <div style={{ padding: "16px" }}>
            <div style={{ marginBottom: "8px" }}>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                max={currentDate}
                style={{ marginLeft: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                max={currentDate}
                style={{ marginLeft: "8px" }}
              />
            </div>
            <ButtonStrip end>
              <Button onClick={handleCancel} secondary>
                Cancel
              </Button>
              <Button onClick={handleSave} primary>
                Save
              </Button>
            </ButtonStrip>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PeriodButton;
