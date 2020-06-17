import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(function() {    
      $("#sidebar-menu a").each(function() {
        if (this.href == window.location.href) {
          // console.log(this.href);
          $(this).addClass("active");
          $(this).parent().addClass("active"); // add active to li of the current link
          $(this).parent().parent().addClass("in");
          $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
          $(this).parent().parent().parent().addClass("active");
          $(this).parent().parent().parent().parent().addClass("in"); // add active to li of the current link
          $(this).parent().parent().parent().parent().parent().addClass("active");
        }
        return false;
      });
    }, 1000);
  }


  // onClick(event) {
  //   var target = event.target || event.srcElement || event.currentTarget;
  //   var idAttr = target.attributes.href;
  //   var value = idAttr.nodeValue;
  //   alert(target);
  // }
  

}
