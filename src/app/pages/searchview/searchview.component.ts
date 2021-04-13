import { Component, OnInit } from '@angular/core';
import { SearchdataService } from 'src/app/services/searchdata.service';
declare const VirtualSelect: any;
@Component({
  selector: 'app-searchview',
  templateUrl: './searchview.component.html',
  styleUrls: ['./searchview.component.scss']
})
export class SearchviewComponent implements OnInit {

  searchArray = [
    // {item_id: 1, label: 'All', value: 'All', active: true},
    {item_id: 2, label: 'Title', value: 'Title', key: 'title', active: true},
    {item_id: 3, label: 'Description', value: 'Description', key: 'description', active: true},
    {item_id: 4, label: 'Keywords', value: 'Keywords', key: 'keywords', active: true}
  ];

  searchText = '';

  dataList = new Array();
  collectionList = new Array();

  constructor(
    private searchServ: SearchdataService
  ) { }

  ngOnInit(): void {
    VirtualSelect.init({
      ele: '#example-select',
      options: this.searchArray,
      multiple: true,
      selectedValue: this.searchArray.map(o => o.value),
      selectAllText: 'All',
      search: false
    });
    this.changeDetect();
    this.loadData();
  }

  changeDetect(): void {
    const items: any = document.querySelector('#example-select') as HTMLDivElement;
    items.addEventListener('change', () => {
      console.log(items.value);
      const arr = items.value;
      this.searchArray.map((o) => {
        const find = arr.includes(o.value);
        if (find) {
          o.active = true;
        } else {
          o.active = false;
        }
        return o;
      });
    });

  }

  loadData(): any {
    this.searchServ.getData({}).subscribe(
      (d: any) => {
        this.collectionList = d.sections[0].assets;
        this.dataList = d.sections[0].assets;
        console.log(this.dataList);
      },
      e => {
        console.log(e);
      }
    );
  }

  clear(): void {
    this.dataList = this.collectionList;
    const items: any = document.querySelector('#example-select') as HTMLDivElement;
    items.setValue(this.searchArray.map(o => o.value));
  }

  submit(): void {
    const items: any = document.querySelector('#example-select') as HTMLDivElement;
    console.log('submit', this.searchText, items?.value);
    if (this.searchText === null || this.searchText === '') {
      console.error('Invalid search text');
    } else {
      let obj = items?.value;
      if (items?.value?.length === 0 || items?.value?.length === this.searchArray.length) {
        obj = this.searchArray.map(o => o.value);
      }
      const arr = this.collectionList;
      let arrList: any = [];
      const filter: any = {};
      obj.forEach((e1: any, k: any) => {
        const find = this.searchArray.find(o => o.value === e1);
        if (find) {
          filter[find?.key] = this.searchText;
        }
      });
      console.log('toFilter', filter);
      arrList = arr.filter((item: any) => {
        for (const key in filter) {
          if (item[key] !== undefined &&
            (item[key].toString().toLowerCase()).includes(filter[key].toString().toLowerCase()) &&
            (item[key].toString().toLowerCase()).includes('<' + filter[key].toString().toLowerCase() + '>') === false){
            console.log('', item[key].toString().toLowerCase(), filter[key].toString().toLowerCase());
            return true;
          }
        }
        return false;
      });
      console.log(arrList);
      this.dataList = arrList;
    }
  }
}
