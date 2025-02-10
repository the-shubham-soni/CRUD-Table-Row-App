import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "data";
  isNewTabOpened = false;
  showUpdateFormFlag = false;
  showInsertFormFlag = false;
  
  updateDetail = { id: 0, name: '', email: '' };
  insertDetail={ id: 0, name: '', email: '' };

  // Array to hold rows for the user table
  rows = [
    { number: 1, name: 'Raj', email: 'Raj@egmail.com', date: '2024-12-10' },
    { number: 2, name: 'Sakshi', email: 'sakshi22@egmail.com', date: '2024-12-09' }
  ];

  // Array to hold rows for the details table
  details = [
    { deptId: 1, deptName: 'HR', age: 30, date: '2024-12-10' },
    { deptId: 2, deptName: 'Finance', age: 29, date: '2024-12-09' }
  ];

  // This object will bind with the form fields for user table
  newRow = { number: 0, name: '', email: '', date: '' };

  // This object will bind with the form fields for details table
  newDetail = { deptId: 0, deptName: '', age: 0, date: '' };

  constructor(private http: HttpClient) {}

  // Add a new row to the user table
  addRow() {
    this.rows.push({ ...this.newRow });
    this.newRow = { number: 0, name: '', email: '', date: '' }; // Reset the form
  }

  // Add a new row to the details table
  addDetail() {
    this.details.push({ ...this.newDetail });
    this.newDetail = { deptId: 0, deptName: '', age: 0, date: '' }; // Reset the form
  }

  // Delete a specific row from the user table
  deleteRow(index: number) {
    this.rows.splice(index, 1); // Remove the row at the specified index
  }

  // Delete a specific row from the details table
  deleteDetail(index: number) {
    this.details.splice(index, 1); // Remove the row at the specified index
  }

  // Open the current page in a new tab
  openInNewTab() {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>All Records</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              table, th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              tbody tr:nth-child(even) { background-color: #f9f9f9; }
              button { background-color:rgb(83, 76, 175); color: white; padding: 10px; border: none; cursor: pointer; width: 100%; height: 10%; font-size: 2rem;}
              button:hover { background-color:rgb(49, 42, 138); }
            </style>
          </head>
          <body>
            <h1>Header Records</h1>
            <table>
              <thead>
                <tr><th>Number</th><th>Name</th><th>Email</th><th>Date</th></tr>
              </thead>
              <tbody>
                ${this.rows.map(row => `
                  <tr>
                    <td>${row.number}</td>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.date}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
            <h1>Details Records</h1>
            <table>
              <thead>
                <tr><th>DeptId</th><th>Dept Name</th><th>Age</th><th>Date</th></tr>
              </thead>
              <tbody>
                ${this.details.map(detail => `
                  <tr>
                    <td>${detail.deptId}</td>
                    <td>${detail.deptName}</td>
                    <td>${detail.age}</td>
                    <td>${detail.date}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
            <button id="getDetailsButton">Get Details from DB</button>
            <table id="dataFromDb" style="display: none;">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Email</th></tr>
              </thead>
              <tbody></tbody>
            </table>
            <script>
              document.getElementById('getDetailsButton').addEventListener('click', async function() {
                try {
                  const response = await fetch('http://localhost:8089/users');
                  const data = await response.json();
                  const table = document.getElementById('dataFromDb');
                  const tbody = table.querySelector('tbody');
                  tbody.innerHTML = data.map(row => \`
                    <tr>
                      <td>\${row.id}</td>
                      <td>\${row.name}</td>
                      <td>\${row.email}</td>
                    </tr>\`).join('');
                  table.style.display = 'table';
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
              });
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  }
  

  // Show update form for user details
  // Show update form for user details
// Show update form for user details
showUpdateForm() {
  this.showUpdateFormFlag = true; // Display the form
}

// Update user details in the backend
updateUserDetails() {
  
  const updatedUser = {
    id: this.updateDetail.id,
    name: this.updateDetail.name,
    email: this.updateDetail.email,
  };

  console.log('Sending user data to backend:', this.updateDetail);

  // Send a POST request to update user details
  this.http.post('http://localhost:8089/updateUser', updatedUser).subscribe(
    response => {
      console.log('User updated successfully', response);
      this.showUpdateFormFlag = false; // Hide the form after successful update
      alert('User updated in database successfully!');
    },
    error => {
      console.error('Error updating user', error);
      alert('Failed to update user in database.');
    }
  );
}

// INSERT USER DETAILS TO DB
showInsertForm() {
  this.showInsertFormFlag = true; // Display the form
}

// Update user details in the backend
insertUserDetails() {
  
  const insertedUser = {
    id: this.insertDetail.id,
    name: this.insertDetail.name,
    email: this.insertDetail.email,
  };

  console.log('Sending user data to backend:', this.insertDetail);

  // Send a POST request to update user details
  this.http.post('http://localhost:8089/insertUser', insertedUser).subscribe(
    response => {
      console.log('User inserted successfully', response);
      this.showInsertFormFlag = false; // Hide the form after successful update
      alert('User inserted in database successfully!');
    },
    error => {
      console.error('Error inserting user', error);
      alert('Failed to insert user in database.');
    }
  );
}



}
