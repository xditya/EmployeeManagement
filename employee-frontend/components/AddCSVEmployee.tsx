import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaFileArrowDown } from "react-icons/fa6";
import Papa from "papaparse";
import { createEmployees } from "@/lib/data";

export function AddCSVEmployee() {
  const fileInputRef = useRef(null);
  const [fileKey, setFileKey] = useState(0); // Key to force re-rendering

  // Function to handle file input change
  const handleFileInputChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: handleCSVData,
        header: true,
      });
    }
  };

  // Function to parse CSV data
  const handleCSVData = async(result:any) => {
    const employeesData = result.data.map((row, index) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      contactNumber: row.contactNumber,
      dateOfJoin: row.dateOfJoin,
      yearsOfExperience: parseInt(row.yearsOfExperience),
      departmentId: parseInt(row.departmentId),
    }));

    // Log the parsed data
    console.log("Parsed CSV Data:", employeesData);

    // Now, you can use the `employeesData` array to do whatever you need
    // For example, you can call a function to create employees
    // createEmployees(employeesData);
    const res = await createEmployees(employeesData);
    if (res) {
      console.log("Employees List Added");
    }
  };

  // Function to handle import button click
  const handleImportButtonClick = () => {
    // Click the hidden file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={handleImportButtonClick}>
            Import CSV
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Employees using CSV</DialogTitle>
            <DialogDescription>
              Choose the CSV file which contains the Employees Data
            </DialogDescription>
          </DialogHeader>
          <form>
            <input
              key={fileKey} // Key to force re-rendering
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
            <DialogFooter>
              <Button onClick={handleImportButtonClick} type="button">
                Import CSV <FaFileArrowDown className="ml-2" />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
