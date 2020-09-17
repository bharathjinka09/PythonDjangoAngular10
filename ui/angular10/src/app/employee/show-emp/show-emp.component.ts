import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  constructor(private service: SharedService) {}

  EmployeeList: any = [];

  ModalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  EmployeeIdFilter: string = '';
  EmployeeNameFilter: string = '';
  EmployeeDepartmentFilter: string = '';
  DateOfJoiningFilter: string = '';
  EmployeeListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.png',
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item) {
    console.log(item);
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item) {
    if (confirm('Are you sure to delete ?')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe((data) => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
    });
  }

  FilterFn() {
    var EmployeeIdFilter = this.EmployeeIdFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;
    var EmployeeDepartmentFilter = this.EmployeeDepartmentFilter;
    var DateOfJoiningFilter = this.DateOfJoiningFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
      return (
        el.EmployeeId.toString()
          .toLowerCase()
          .includes(EmployeeIdFilter.toString().trim().toLowerCase()) &&
        el.EmployeeName.toString()
          .toLowerCase()
          .includes(EmployeeNameFilter.toString().trim().toLowerCase()) &&
        el.Department.toString()
          .toLowerCase()
          .includes(EmployeeDepartmentFilter.toString().trim().toLowerCase()) &&
        el.DateOfJoining.toString()
          .toLowerCase()
          .includes(DateOfJoiningFilter.toString().trim().toLowerCase())
      );
    });
  }

  sortResult(prop, asc) {
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
  }
}
