import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private storageKey = 'dataRows';  // Key used to store the data in localStorage

  constructor() { }

  // Get rows from localStorage or return an empty array if none exists
  getRows() {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  // Save rows to localStorage
  saveRows(rows: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(rows));
  }

  // Add a row to the current data and save it to localStorage
  addRow(newRow: any) {
    const rows = this.getRows();
    rows.push(newRow);
    this.saveRows(rows);  // Save updated rows
  }

}
